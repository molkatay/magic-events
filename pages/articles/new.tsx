import { GetStaticPropsContext, GetStaticPropsResult } from "next"

import { getGlobalElements } from "lib/get-global-elements"
import { Layout, LayoutProps } from "components/layout"
import { PageHeader } from "components/page-header"
import { FormArticle } from "components/form--article"

interface NewArticlesPageProps extends LayoutProps {}

export default function NewArticlesPage({
  menus,
                                          siteInfos,
  blocks,
}: NewArticlesPageProps) {

  return (
    <Layout meta={{ title: "New article" }} menus={menus} blocks={blocks} siteInfos={siteInfos}>
      <PageHeader
        heading={"New article"}
        breadcrumbs={[
          {
            title: "My account",
            url: "/account",
          },
          {
            title: "New article",
          },
        ]}
      />
      <div className="container pb-10">
        <FormArticle className="max-w-2xl mx-auto" />
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<NewArticlesPageProps>> {
  return {
    props: {
      ...(await getGlobalElements(context)),
    },
  }
}
