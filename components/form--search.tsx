import * as React from "react"
import classNames from "classnames"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

interface FormSearchProps extends React.HTMLProps<HTMLFormElement> {}

export function FormSearch({ className, ...props }: FormSearchProps) {
  const router = useRouter()

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    // Redirect to search page.
    window.location.href = `/search?keys=${data.get("keys")}`
  }

  return (
    <>
      <Link href="/search" passHref legacyBehavior={true}>
        <a className="md:hidden">
          <span className="sr-only">{"search"}</span>
          <SearchIcon />
        </a>
      </Link>

      <form className={`hidden md:flex items-center ${className}`}
            onSubmit={onSubmit} {...props}>
        <div className="relative flex-1">
          <label htmlFor="search"
                 className="absolute inset-y-0 left-0 flex items-center pl-2">
            <span className="sr-only">Search</span>
            <SearchIcon />
          </label>
          <input
            id="search"
            name="search"
            required
            className="w-60 lg:w-80 pl-10 pr-4 py-2 border border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type text here"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Search
        </button>
      </form>
    </>
  )
}

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
}

function SearchIcon({ className, ...props }: SearchIconProps) {
  return (
    <Image src="/search.svg" alt="Search" width={24} height={24} />
  )
}
