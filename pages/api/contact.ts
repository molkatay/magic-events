import { NextApiRequest, NextApiResponse } from "next"
import { drupal } from '../../lib/drupal'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    // Only accept POST requests.
    if (request.method !== "POST") {
      return response.status(405).end()
    }

    // The body field will contain the form values.
    // You can make a request to your site with these values.
    const body = JSON.parse(request.body)

    // Format the payload for /entity/contact_message
    const payload = {
      webform_id: "contact",
      name:  body.name,
      email: body.email,
      subject: body.subject ,
      message: body.message ,
    }

      const url = drupal.buildUrl(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit?_format=json`)
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(payload),

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })

      if (!result.ok) {
        throw new Error()
      }
      response.status(200).end()

  } catch (error) {

    return response.status(400).json(error.message)
  }
}