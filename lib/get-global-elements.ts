import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { DrupalBlock, DrupalTaxonomyTerm } from "next-drupal";

import { drupal } from "lib/drupal";
import { getParams } from "lib/get-params";
import { LayoutProps } from "components/layout";
import siteConfig from "site.config"
type GlobalElements = LayoutProps;

// This is a helper function to fetch global elements for layout.
// This is going to be run for every page on build.
// To make this fast, you could cache the results, for example, on Redis.
export async function getGlobalElements(
  context: GetStaticPropsContext | GetServerSidePropsContext
): Promise<{
  siteInfos: { siteInfos: any };
  blocks: { eventCollections: any; disclaimer: any };
  menus: { footer: any; main: any };
}> {
  const menuOpts = {
    params: getParams("menu_link_content--menu_link_content").getQueryObject(),
    locale: context.locale,
    defaultLocale: context.defaultLocale,
  };

  // Fetch menu items.
  const mainMenu = await drupal.getMenu("main", menuOpts);
  const footerMenu = await drupal.getMenu("footer", menuOpts);

  // Fetch the disclaimer block.
  // See comment above on why we use drupal.getResourceCollectionFromContext
  // instead of drupal.getResource.
  const [disclaimer] = await drupal.getResourceCollectionFromContext<DrupalBlock[]>(
    "block_content--disclaimer_block",
    context,
    {
      params: getParams("block_content--disclaimer_block")
        .addFilter("info", "Event Magic Disclaimer")
        .addPageLimit(1)
        .getQueryObject(),
    }
  );

  // Fetch events collections view.
  const { results: eventCollections } = await drupal.getView<DrupalTaxonomyTerm[]>(
    "event_collections--block",
    {
      locale: context.locale,
      defaultLocale: context.defaultLocale,
      params: getParams("taxonomy_term--tags").addSort("name").getQueryObject(),
    }
  );

  let siteInfos;

  try {
    // Fetch site configuration
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/site/site`);
    if (!response.ok) {
      throw new Error(`Failed to fetch site configuration: ${response.statusText}`);
    }
    const data = await response.json();
    // Assuming the structure of your API response
    siteInfos = {
      name: data.data.attributes.name || `${siteConfig.name}`,
      slogan: data.data.attributes.slogan || `${siteConfig.slogan}`,
      logo: data.data.attributes.global_logo || "/hilink-logo.svg",
      favicon: data.data.attributes.global_favicon || "default favicon URL",
    };
  } catch (error) {
    console.error("Error fetching site configuration:", error);
    siteInfos = {
      name: `${siteConfig.name}`,
      slogan: `${siteConfig.slogan}`,
      logo: "/hilink-logo.svg",
      favicon: "default favicon URL",
    };
  }
  return {
    menus: {
      main: mainMenu.items,
      footer: footerMenu.items,
    },
    blocks: {
      eventCollections,
      disclaimer,
    },
    siteInfos: {
      siteInfos,
    },
  };
}
