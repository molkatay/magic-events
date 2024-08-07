import Link from "next/link"

export interface BreadcrumbsProps {
  items: {
    title: string
    url?: string
  }[]
}

export function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {
  if (!items?.length) {
    return null
  }

  items.unshift({
    title: "Home",
    url: "/",
  })

  return (
    
    <nav aria-label="breadcrumb" className="max-container relative z-30 flex justify-start w-full" {...props}>
      <ol className="flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center truncate">
            {item.url ? (
              <Link href={item.url} className="underline text-link" passHref>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
            {index !== items.length - 1 && (
              <svg
                className="w-3 h-3 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
