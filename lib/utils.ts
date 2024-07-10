import siteConfig from "../site.config"

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_IMAGE_DRUPAL_BASE_URL}${input}`
}

export function trimText(text: string, maxLength: number) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
export function stripHtml (text:string) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export function  loaderProp ({src, width, quality}) {
    return `${src}?w=${width}&q=${quality || 75}`;
}

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url)
}