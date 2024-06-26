import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"
import { MediaImage } from './media--image'
import { Breadcrumbs } from './breadcrumbs'

export interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  return (
    <div
    className="container mx-auto py-5">
   
      <Breadcrumbs
        items={[
          {
            title: "Blog",
            url: "/articles"
          },
          {

            title: node.title
          }
        ]}
      />
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
      {node.field_media_image && (
        <MediaImage media={node.field_media_image} width={335} height={225} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" />
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
    </div>
  )
}
