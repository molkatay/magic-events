import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import { getGlobalElements } from "lib/get-global-elements"
import { Layout, LayoutProps } from "components/layout"
import { FormRegister } from "components/form--register"
import { PageHeader } from "components/page-header"

interface RegisterPageProps extends LayoutProps {}

export default function RegisterPage({ menus, blocks, siteInfos }: RegisterPageProps) {
  const router = useRouter()
  const { status } = useSession()

  if (status === "authenticated") {
    router.push("/")
    return null
  }

  return (
    <Layout meta={{ title: 'Register' }} menus={menus} blocks={blocks}
            siteInfos={siteInfos}>
      <div className="container mx-auto px-4 py-5">

        <PageHeader
          heading={'Register'}
          breadcrumbs={[
            {
              title: 'Register'
            }
          ]}
        />
        {status === 'unauthenticated' && (
          <div className="container pb-10">
            <FormRegister className="max-w-xl mx-auto" />
          </div>
        )}
      </div>
    </Layout>
)
}

export async function getStaticProps(
context: GetStaticPropsContext
): Promise<GetStaticPropsResult<RegisterPageProps>> {
  return {
    props: {
      ...(await getGlobalElements(context)),
    },
  }
}
