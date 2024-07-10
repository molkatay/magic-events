import { DrupalNode } from "next-drupal"
import { useRouter } from "next/router"

import { formatDate } from "../lib/utils"
import { MediaImage } from "./media--image"
import Button from './Button'

interface NodeArticleRowProps {
  node: DrupalNode
}

export function NodeArticleRow({ node, ...props }: NodeArticleRowProps) {
  const router = useRouter()

  async function handleDelete() {
    if (!window?.confirm("are-you-use-you-want-to-delete-this-article")) {
      return
    }

    const response = await fetch(`/api/articles/${node.id}`, {
      method: "DELETE",
    })

    if (response?.ok) {
      router.reload()
    }
  }

  return (
    <article
      className="relative grid grid-cols-[120px_1fr] items-start gap-4 p-4 overflow-hidden bg-white border border-border group"
      {...props}
    >
      <MediaImage media={node.field_media_image} width={115} height={75} />
      <div className="flex items-start justify-between text-text">
        <div>
          <h2 className="flex-1 font-serif text-xl">{node.title}</h2>
          <p className="text-sm text-gray">
            {formatDate(node.created)} -{" "}
            {node.status ? "published" : "draft"}
          </p>
        </div>


        <Button type="button" onClick={handleDelete}
                icon="/user.svg" variant="btn_dark_green"
                title= {"delete"}
        />
      </div>
    </article>
  )
}
