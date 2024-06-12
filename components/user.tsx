import { DrupalUser } from "next-drupal"
interface UserProps {
    user: DrupalUser
}

export function User({ user, ...props }: UserProps) {
    return (
        <article {...props}>
                <h1 className="mb-4 text-4xl font-bold">{user.display_name}</h1>
            <div className="mb-4 text-gray-600">
                {user.id? (
                    <span>

                        <span className="font-semibold">/author/{user.id}</span>
          </span>
                ) : null}
            </div>
        </article>
    )
}
