import Image, { ImageProps } from "next/image"

import { absoluteUrl, loaderProp } from '../lib/utils'
import { MediaProps } from "./media"

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImage({
  media,
  layout = "responsive",
  objectFit,
  width,
  className,
  height,
  priority,
  ...props
}: MediaImageProps) {
  const image = media?.field_media_image

  if (!image?.uri) {
    return null
  }

  const sizeProps =
    layout === "fill"
      ? null
      : {
          width: width || image.resourceIdObjMeta.width,
          height: height || image.resourceIdObjMeta.height,
        }

  return (
    <div className="media__content image__wrapper" {...props}>
      <Image
        src={absoluteUrl(image.uri.url)}
        layout={layout}
        objectFit={objectFit}
        className={className}
        loader={loaderProp}
        alt={image.resourceIdObjMeta.alt || "Image"}
        title={image.resourceIdObjMeta.title}
        priority={priority}
        {...sizeProps}
      />

    </div>
  )
}
