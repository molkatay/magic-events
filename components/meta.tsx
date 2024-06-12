import Head from "next/head"
import { useRouter } from "next/router"

import siteConfig from "site.config"

export interface MetaProps {
  title?: string
  description?: string
  path?: string
}

export function Meta({ title, description }: MetaProps) {
  const router = useRouter()

  return (
    <Head>
      <link
        rel="canonical"
        href=""
      />
      <title>
        {`${title} | ${siteConfig.name}`}
      </title>
      <meta name="description" content={description || siteConfig.slogan} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/meta.jpg`}
      />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="600" />
    </Head>
  )
}
