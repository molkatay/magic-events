import { DrupalNode } from "next-drupal"
import Link from "next/link"

import { MediaImage } from "./media--image"

interface NodeEventTeaserProps {
  node: DrupalNode
}

export function NodeEventTeaser({ node, ...props }: NodeEventTeaserProps) {

  return (
    <article
      className="relative flex flex-col p-4 space-y-4 overflow-hidden bg-white border border-border group"
      {...props}
    >
      <h2 className="flex-1 font-serif text-2xl">{node.title}</h2>

      <MediaImage media={node.field_media_image} width={335} height={225} />
      <Link href={node.path.alias} passHref legacyBehavior={true} className="inline-flex items-center uppercase hover:underline text-link">
          {"view-event"}
          <svg
            className="w-5 h-5 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
      </Link>
    </article>
  )
}
