import * as React from "react"
import classNames from "classnames"
import { useRouter } from "next/router"

interface FormArticleProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string | string[]
}

export function FormArticle({ className, ...props }: FormArticleProps) {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)
  const router = useRouter()

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    setFormStatus({ status: "fetching" })

    const response = await fetch("/api/articles", {
      method: "POST",
      body: data,

    })

    if (!response.ok) {
      const errors = await response.json()

      return setFormStatus({
        status: "error",
        message: errors?.map((error) => error.detail),
      })
    }

    router.push("/account")
  }

  return (
    <form
      className={classNames("grid gap-4", className)}
      onSubmit={onSubmit}
      {...props}
    >
      {(formStatus?.status === "success" || formStatus?.status === "error") && (
        <div
          className={classNames("py-3 px-4 border", {
            "border-link bg-link/10 text-link": formStatus.status === "success",
            "border-error bg-error/10 text-error":
              formStatus.status === "error",
          })}
        >
          {Array.isArray(formStatus.message) ? (
            <ul className="list-disc list-inside list">
              {formStatus.message.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          ) : (
            formStatus.message
          )}
        </div>
      )}
      <div className="grid gap-2">
        <label htmlFor="title" className="font-semibold text-text">
          {"Title"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          maxLength={255}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="mail" className="font-semibold text-text">
          {"Image"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          required
          className="px-2 py-3 bg-white border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:ring-0 focus:border-gray"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="body" className="font-semibold text-text">
          {"Body"} <span className="text-sm text-red-500">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          className="h-48 px-2 py-3 border-2 border-gray focus:ring-0 focus:outline-dotted focus:outline-offset-2 focus:border-gray focus:outline-link"
        ></textarea>
      </div>
      <div>
        <input
          type="submit"
          className="font-semibold text-text w-full px-4 py-4 bg-green-500 text-white text-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 hover:underline"
          disabled={formStatus?.status === "fetching"}
          value={
            formStatus?.status === "fetching"
              ? "Please wait"
              : "Create article"
          }
        />
      </div>
    </form>
  )
}
