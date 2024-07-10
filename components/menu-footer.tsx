import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"

interface MenuFooterProps {
  items: DrupalMenuLinkContent[]
}

export function MenuFooter({ items, ...props }: MenuFooterProps) {
  return (
    <nav {...props}>
      <ul
        className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.url} passHref className="hover:underline me-4 md:me-6">
                {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
