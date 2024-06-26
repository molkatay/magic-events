import * as React from "react"
import classNames from "classnames"
import { signUp } from "next-auth/react"
import { useRouter } from "next/router"

interface FormRegisterProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string
}

export function FormRegister({ className, ...props }: FormRegisterProps) {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (router.query.error === "CredentialsSignup") {
      return setFormStatus({
        status: "error",
        message: "unrecognized-username-or-password-please-try-again",
      })
    }

    return setFormStatus(null)
  }, [router])

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    setFormStatus({ status: "fetching" })

    await signUp("credentials", {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    })

    return setFormStatus({
      status: "success",
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
        <label htmlFor="username" className="font-semibold text-text">
          {"Username"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          maxLength={255}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
        />
        <p className="text-gray-30 text-sm text-text">{"Enter your drupal username"}</p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="font-semibold text-text">
          {"Email"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={255}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
        />
        <p className="text-gray-30 text-sm text-text">{"Enter your drupal email"}</p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="password" className="font-semibold text-text">
          {"Password"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
        />
        <p className="text-gray-30 text-sm text-text">
          {"Enter the password that accompanies your username"}
        </p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="confirm_password" className="font-semibold text-text">
          {"Confirm Password"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
        />
        <p className="text-gray-30 text-sm text-text">
          {"Confirm your password"}
        </p>
      </div>
      <div>
        <input
          type="submit"
          className="font-semibold text-text w-full px-4 py-4 bg-green-500 text-white text-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 hover:underline"
          disabled={formStatus?.status === "fetching"}
          value={
            formStatus?.status === "fetching" ? "Please wait" : "Sign Up"
          }
        />
      </div>
    </form>
  )
}
