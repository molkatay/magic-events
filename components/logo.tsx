import * as React from "react"
import Image from "next/image"
import {absoluteUrl,  loaderProp} from "lib/utils"
export function Logo({ ...props }) {
  return (
    <Image src={absoluteUrl(siteInfos.logo)}  loader={loaderProp} alt={siteInfos.name} width={200} height={35}/>
  )
}
