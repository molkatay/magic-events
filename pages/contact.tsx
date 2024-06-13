import { GetStaticPropsContext, GetStaticPropsResult } from 'next'

import { getGlobalElements } from 'lib/get-global-elements'
import { Breadcrumbs } from 'components/breadcrumbs'
import { Layout, LayoutProps } from 'components/layout'
import { PageHeader } from 'components/page-header'
import { FormContact } from 'components/form--contact'

interface ContactPageProps extends LayoutProps {
}

export default function ContactPage({
                                      menus, blocks, siteInfos
                                    }: ContactPageProps) {
  return (
    <Layout
      meta={{
        title: 'Contact Us'
      }}
      menus={menus}
      blocks={blocks} siteInfos={siteInfos}
    >
      <PageHeader
        heading={'Contact Us'}
        breadcrumbs={[
          {
            title: 'Contact'
          }
        ]}
      />
      <div className="container">
        <div className="max-w-xl pb-8 mx-auto">
          <FormContact />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ContactPageProps>> {
  return {
    props: {
      ...(await getGlobalElements(context))
    }
  }
}