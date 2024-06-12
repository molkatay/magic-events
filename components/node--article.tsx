import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
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
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image2 && (
        <figure>
          <Image
            src={absoluteUrl(node.field_image2.uri.url)}
            width={768}
            height={400}
            alt={node.field_image2.resourceIdObjMeta.alt}
            priority
          />
          {node.field_image2.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image2.resourceIdObjMeta.title}
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
        {node.field_tags && (
            <div>
                <h3>Tags</h3>
                <ul>{
                        node.field_tags.map((item) => (
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
