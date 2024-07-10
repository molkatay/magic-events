import { DrupalNode } from "next-drupal"
        import Link from "next/link"

        import { MediaImage } from "./media--image"
        import { formatDate } from '../lib/utils'

        interface NodeEventCardProps {
        node: DrupalNode
        }

        export function NodeEventCard({ node, ...props }: NodeEventCardProps) {

        return (
<article
        className="relative flex flex-col p-4 space-y-4 overflow-hidden bg-white border border-border group"
        {...props}
        >
<h2 className="mb-1 text-slate-900 font-semibold">{node.title}</h2>
<MediaImage media={node.field_media_image} width={335} height={225}
        className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" />
<span
className="mb-1 block text-xs prose-slate prose-sm text-slate-600">Posted by {node.uid.display_name} - {formatDate(node.field_event_date)}</span>
<span
className="mb-1 block text-sm leading-6 text-cyan-500">{node.field_tags}</span>
<Link href={node.path.alias} passHref legacyBehavior={true} className="inline-flex items-center hover:underline text-slate-900 text-link font-bold">

{"View event"}
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
