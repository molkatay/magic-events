import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"
import classNames from "classnames"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { NodeArticleCardAlt } from "components/node--article--card-alt"
import { NodeEventCard } from "components/node--event--card"

interface IndexPageProps extends LayoutProps {
  promotedArticles: DrupalNode[]
  promotedEvents: DrupalNode[]
}

export default function IndexPage({
                                    promotedArticles,
                                    promotedEvents,
                                    menus,
                                    siteInfos
                                  }: IndexPageProps) {
  return (
    <Layout meta={{ title: 'home' }} menus={menus} siteInfos={siteInfos}>

        <div
          className="container grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {promotedArticles?.length
            ? promotedArticles.map((node, index) => (
              <NodeArticleCardAlt
                node={node}
                key={node.id}
                className={classNames({
                  'col-span-1 sm:col-span-2 lg:col-span-1': index === 0,
                  'flex-col-reverse space-y-0 gap-4': index !== 0
                })}
              />
            ))
            : null}
        </div>
        {promotedEvents?.length ? (
          <div className="container">
            <p className="py-10 text-3xl font-semibold mb-8 text-center text-text">
              {
                'Explore events'
              }
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              {promotedEvents.map((node) => (
                <NodeEventCard node={node} key={node.id} />
              ))}
            </div>
          </div>
        ) : null}

    </Layout>
)
}

export async function getStaticProps(
context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IndexPageProps>> {

  const promotedArticles = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: getParams("node--article", "card")

      .addFilter("promote", "1")
      .addPageLimit(3)
      .addSort("created", "DESC")
      .getQueryObject(),
  })

  const promotedEvents = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getParams("node--event", "card")
      .addSort("created", "DESC")
      .addPageLimit(4)
      .getQueryObject(),
  })



  return {
    props: {
      ...(await getGlobalElements(context)),
      promotedArticles,
      promotedEvents,
    },
  }
}