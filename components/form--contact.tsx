import * as React from "react"
import classNames from "classnames"
import { useSession } from "next-auth/react"

interface FormContactProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string
}

export function FormContact({ className, ...props }: FormContactProps) {
  const { data: session, status } = useSession()
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)


  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
console.log(data)
    console.log(session)

    setFormStatus({ status: "fetching" })

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IMAGE_DRUPAL_BASE_URL}/webform_rest/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      }
    )
    if (!response.ok) {
      return setFormStatus({
        status: "error",
        message: "An error occured please try again",
      })
    }

    return setFormStatus({
      status: "success",
      message: "Your message has been sent",
    })
  }

  return (
    <form
      className={classNames("grid gap-4", className)}
      onSubmit={onSubmit}
      {...props}
    >
      {formStatus?.message && (
        <p
          className={classNames("py-3 px-4 border", {
            "border-link bg-link/10 text-link":
              formStatus?.status === "success",
            "border-error bg-error/10 text-error":
              formStatus?.status === "error",
          })}
        >
          {formStatus.message}
        </p>
      )}
      <div className="grid gap-2">
        <label htmlFor="name" className="font-semibold text-text">
          {"Your name"} <span className="text-sm text-red-500">*</span>
        </label>
        {status === "authenticated" ? (
          <>
            <p>{session?.user.name}</p>
            <input type="hidden" name="email" value={session?.user.name} />
          </>
        ) : (
          <input
            id="name"
            name="name"
            maxLength={255}
            required
            className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
          />
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="font-semibold text-text">
          {"your email address"}{" "}
          <span className="text-sm text-red-500">*</span>
        </label>
        {status === "authenticated" ? (
          <>
            <p>{session?.user.email}</p>
            <input type="hidden" name="email" value={session?.user.email} />
          </>
        ) : (
          <input
            type="email"
            id="email"
            name="email"
            maxLength={255}
            required
            className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:ring-0 focus:border-gray"
          />
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="font-semibold text-text">
          {"subject"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          maxLength={255}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:border-gray"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="font-semibold text-text">
          {"message"} <span className="text-sm text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
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
              : "Send message"
          }
        />
      </div>
    </form>
  )
}
