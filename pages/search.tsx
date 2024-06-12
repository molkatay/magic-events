import * as React from "react"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import Highlighter from "react-highlight-words"

import { formatDate } from "lib/utils"
import { getGlobalElements } from "lib/get-global-elements"
import { useSearch } from "hooks/use-search"
import { Layout, LayoutProps } from "components/layout"
import { PageHeader } from "components/page-header"

interface SearchPageProps extends LayoutProps {}

export default function SearchPage({ menus, blocks,siteInfos }: SearchPageProps) {
  const router = useRouter()
  const [keys, setKeys] = React.useState<string>(null)
  const { isLoading, results } = useSearch(keys)

  React.useEffect(() => {
    if (router.query?.keys) {
      setKeys(router.query.keys as string)
    }
  }, [router])

  return (
    <Layout
      meta={{ title: keys ? `search-for-keys, ${ keys }` :  "search" }}
      menus={menus} siteInfos={siteInfos}
    >
      <PageHeader
        heading={ "Search"}
        breadcrumbs={[
          {
            title: "Search",
          },
        ]}
      />
      <div className="container">
        {isLoading && keys && (
          <p className="font-serif text-2xl text-text">
            {"searching-for"}: <strong>{keys}</strong>...
          </p>
        )}
        {results?.length ? (
          <div className="grid gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="grid gap-2 p-4 bg-white border border-border"
              >
                <Link href={result.path.alias} passHref legacyBehavior={true}>
                  <a className="font-serif text-2xl underline text-link">
                    <Highlighter
                      textToHighlight={result.title}
                      searchWords={[keys]}
                      highlightClassName="font-semibold bg-transparent"
                    />
                  </a>
                </Link>
                <p className="text-text">
                  <span className="capitalize">
                    {result.type.replace("node--", "")}
                  </span>{" "}
                  - {formatDate(result.created)}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        {!isLoading && !results?.length ? (
          <p className="font-serif text-2xl text-text">
            {"your-search-yielded-no-results"}
          </p>
        ) : null}
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<SearchPageProps>> {
  return {
    props: {
      ...(await getGlobalElements(context)),
    },
  }
}
