import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { getGlobalElements } from "lib/get-global-elements"
import { Layout, LayoutProps } from "components/layout"
import { FormLogin } from "components/form--login"
import { PageHeader } from "components/page-header"

interface LoginPageProps extends LayoutProps {}

export default function LoginPage({ menus, blocks, siteInfos }: LoginPageProps) {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      const loginToDrupal = async () => {
        try {
          const response = await fetch('/api/drupal-login', {
            method: 'POST',
          });
          const data = await response.json();
          if (data.message === 'Logged in to Drupal') {
            console.log('Successfully logged in to Drupal');
            router.push("/");
          } else {
            console.error('Failed to log in to Drupal');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      loginToDrupal();
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null;
  }

  return (
    <Layout meta={{ title: 'Login' }} menus={menus} blocks={blocks} siteInfos={siteInfos}>
      <div className="container mx-auto px-4 py-5">
        <PageHeader
          heading={'Login'}
          breadcrumbs={[
            {
              title: 'Login'
            }
          ]}
        />
        {status === 'unauthenticated' && (
          <div className="container pb-10">
            <FormLogin className="max-w-xl mx-auto" />
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<LoginPageProps>> {
  return {
    props: {
      ...(await getGlobalElements(context)),
    },
  }
}
