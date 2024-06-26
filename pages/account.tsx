import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { DrupalNode } from 'next-drupal'
import Link from 'next/link'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import { getSession } from 'next-auth/react'

import { drupal } from 'lib/drupal'
import { getGlobalElements } from 'lib/get-global-elements'
import { Layout, LayoutProps } from 'components/layout'
import { PageHeader } from 'components/page-header'
import { NodeArticleRow } from 'components/node--article--row'

interface AccountPageProps extends LayoutProps {
  articles: DrupalNode[]
}

export default function AccountsPage({
                                       articles,
                                       menus,
                                       siteInfos
                                     }: AccountPageProps) {

  return (

    <Layout
      menus={menus} siteInfos={siteInfos}
      meta={{
        title: 'My account'
      }}
    >
      <div className="container mx-auto px-4 py-5">

        <PageHeader
          heading={'My account'}
          breadcrumbs={[
            {
              title: 'My account'
            }
          ]}
        >
          <Link href="/articles/new" passHref legacyBehavior={true}>
            <a
              className="bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 px-3 py-1 text-white transition-colors border-2 rounded-md lg:text-xl lg:px-4 lg:py-2 bg-secondary border-secondary">
              New Article
            </a>
          </Link>
        </PageHeader>
        <div className="container">
          {articles?.length ? (
            <div className="grid max-w-2xl gap-4 mx-auto">
              {articles.map((article) => (
                <NodeArticleRow key={article.id} node={article} />
              ))}
            </div>
          ) : (
            <p className="font-serif text-2xl text-center text-text">
              {'you have no articles'}
            </p>
          )}
        </div></div>
    </Layout>
)
}

export async function getServerSideProps(
context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<AccountPageProps>> {
  // Check if user is authenticated.
  const session = await getSession({ ctx: context })
  console.debug(session)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }


  // Fetch all articles sorted by the user.
  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--article',
    context,
    {
      params: new DrupalJsonApiParams()
       .addFilter('uid.meta.drupal_internal__target_id', session.user.id)
        .addInclude(['field_media_image.field_media_image', 'uid.user_picture'])
        .addInclude(['uid'])
        .addFields('node--article', [
          'title',
          'path',
          'field_media_image',
          'uid',
          'status',
          'created'
        ])
        .addFields('media--image', ['field_media_image'])
        .addFields('user--user', ['uid'])
        .addFields('file--file', ['uri', 'resourceIdObjMeta'])
        .addSort('created', 'DESC')
        .getQueryObject(),
      withAuth: session.accessToken
    }
  )

  return {
    props: {
      ...(await getGlobalElements(context)),
      articles
    }
  }
}
