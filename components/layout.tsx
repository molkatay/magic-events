import { Meta, MetaProps } from "./meta"
import { PreviewAlert } from "./preview-alert"
import { Header, HeaderProps } from "./header"
import { Footer, FooterProps } from "./footer"
import { TailwindIndicator } from "./tailwind-indicator"
import React from 'react'

export interface LayoutProps extends HeaderProps, FooterProps {
  meta?: MetaProps
  menus: HeaderProps["menus"] & FooterProps["menus"]
  children?: React.ReactNode
}

export function Layout({ meta, menus, siteInfos, blocks, children }: LayoutProps) {
  return (
    <>
      <Meta {...meta} />
      <div className="min-h-screen padding-container max-container flex w-full flex-col">
        <PreviewAlert />
        <Header menus={{ main: menus.main }} siteInfos={siteInfos} />
        <main className="relative overflow-hidden">{children}</main>
        <Footer menus={{ footer: menus.footer }} blocks={blocks} siteInfos={siteInfos} />
      </div>
      <TailwindIndicator />
    </>
  )
}