import Image from "next/image"
import { DrupalNode } from "next-drupal"
import Link from "next/link";

import { absoluteUrl, formatDate } from "../lib/utils"
import { MediaImage } from "./media--image";
import { Breadcrumbs } from "./breadcrumbs";

interface NodeEventProps {
  node: DrupalNode
}

export function NodeEvent({ node, ...props }: NodeEventProps) {

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
        <span> {formatDate(node.field_event_date)}</span>
      </div>
      {node.field_media_image && (
        <figure>
        <MediaImage media={node.field_media_image} width={335} height={225}
                  className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" />
     
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
        {node.field_event_type && (
            <div>
                <h3>Type</h3>
          <ul>                            
            <li><Link href="term/{item.id}">{node.field_event_type.name}</Link></li>

                </ul>
            </div>
        )}

    </article>
    </div>
    )
}
