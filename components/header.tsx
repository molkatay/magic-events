import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { DrupalMenuLinkContent } from "next-drupal"
import classNames from "classnames"

import siteConfig from "site.config"
import { Logo } from "components/logo"
import { MenuMain } from "components/menu-main"
import { MenuUser } from "components/menu-user"
import { FormSearch } from "components/form--search"
import { absoluteUrl, loaderProp } from '../lib/utils'

export interface HeaderProps {
  menus: {
    main: DrupalMenuLinkContent[]
  }
  siteInfos: {
    siteInfos
  }
}

export function Header({ menus, siteInfos }: HeaderProps) {
  const [showMenu, setShowMenu] = React.useState<Boolean>(false)
  return (

    <header>
      <div className="container mx-auto py-5">
        <div
          className="flex justify-between items-center py-4 border-b border-gray-lighter">
          <div className="flex justify-center">
            <FormSearch />
          </div>
          <div className="flex justify-end">
            <MenuUser />
          </div>
        </div>

        <div className="flex justify-between items-center py-6 flex-wrap">
          <Link href="/" passHref legacyBehavior={true}>
            <a className="flex items-center">
              <Image src={absoluteUrl(siteInfos.siteInfos.logo)}  loader={loaderProp} alt={siteInfos.siteInfos.name} width={120} height={30}/>
              <span className="sr-only">{siteConfig.name}</span>
            </a>
          </Link>
          <button
            className="md:hidden border-transparent hover:border-link transition-all absolute right-4 top-8"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div
            className={`transition-all overflow-hidden md:max-h-screen ${showMenu ? 'max-h-screen' : 'max-h-0'}`}>
            <MenuMain items={menus.main} />
          </div>
        </div>
      </div>
    </header>

  )
}
