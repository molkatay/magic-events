import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "../../lib/drupal"
import { getGlobalElements } from "../../lib/get-global-elements"
import { getParams } from "../../lib/get-params"
import { Layout, LayoutProps } from "../../components/layout"
import { NodeArticleCard } from "../../components/node--article--card"
import { PageHeader } from "../../components/page-header"

interface ArticlePageProps extends LayoutProps {
  articles: DrupalNode[]
}

export default function ArticlesPage({
  articles,
  menus,
  siteInfos
}: ArticlePageProps) {

  return (
    <Layout
      menus={menus}
      meta={{
        title: 'Articles'
      }}
      siteInfos={siteInfos}
    >

        <PageHeader
          heading={'Articles'}
          breadcrumbs={[
            {
              title: 'Articles'
            }
          ]}
        />

<div className="container mx-auto py-5">
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <NodeArticleCard key={article.id} node={article} />
            ))}
          </div>
        </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ArticlePageProps>> {
  // Fetch all published articles sorted by date.
  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: getParams("node--article", "card")
        .addSort("created", "DESC")
        .getQueryObject(),
    }
  )

  return {
    props: {
      ...(await getGlobalElements(context)),
      articles,
    },
  }
}
