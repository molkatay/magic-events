import Image from "next/image"
import { DrupalNode } from "next-drupal"
import Link from "next/link";

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeEventProps {
  node: DrupalNode
}

export function NodeEvent({ node, ...props }: NodeEventProps) {

    return (

    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> {formatDate(node.field_event_date)}</span>
      </div>
      {node.field_media_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_media_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_media_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_media_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_media_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
        {node.field_category && (
            <div>
                <h3>Category</h3>
                <ul>{
                        node.field_category.map((item) => (
                            <li key={item.id}><a href="term/{item.id}">{item.name}</a></li>
                            )

                        )
                    }
                </ul>
            </div>
        )}

    </article>
    )
}
