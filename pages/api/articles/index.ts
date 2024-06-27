import { NextApiRequest, NextApiResponse } from "next"
import { Formidable, PersistentFile } from "formidable"
import { getSession } from "next-auth/react"
import { promises as fs } from "fs"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalFile, DrupalMedia, DrupalNode, JsonApiErrors } from "next-drupal"

import { drupal } from "lib/drupal"

type FormBodyFields = {
  title: string
  body: string
  image: PersistentFile
}

export const config = {
  api: {
    bodyParser: false,
  },
}

// Function to decode Base64 Basic Auth credentials
function decodeBase64Credentials(encodedString) {
  const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
  const [username, password] = decodedString.split(':');
  return { username, password };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return res.status(405).end()
    }

    // Check if the user is authenticated.
    const session = await getSession({ req })
    if (!session) {
      return res.status(403).end()
    }

    // Retrieve form fields from request.
    // We're using Formidable to parse the request and format our fields.
    const form = new Formidable({
      keepExtensions: true,
    })
    // Decode the BasicAuth credentials from the session
    const { username, password } = decodeBase64Credentials(session.basicAuth);

    const fields = await new Promise<FormBodyFields>((resolve, reject) => {
      form.parse(req, async (error, fields, files) => {
        if (error) {
          reject(error)
          return
        }

        resolve({
          title: fields.title[0],
          body: fields.body[0],
          image: files["image"][0],
        })
      })
    })
    const file = await drupal.createFileResource<DrupalFile>(
      "file--file",
      {
        data: {
          attributes: {
            type: "media--image",
            field: "field_media_image",
            filename: fields.image.newFilename,
            file: await fs.readFile(fields.image.filepath),
          },
        },
      },
      {
        withAuth: { username, password },
      }
    )
    console.debug(file)

    // 2. Create the media--image resource from the file--file.
    const media = await drupal.createResource<DrupalMedia>(
      "media--image",
      {
        data: {
          attributes: {
            name: fields.image.newFilename,
          },
          relationships: {
            field_media_image: {
              data: {
                type: "file--file",
                id: file.id,
              },
            },
          },
        },
      },
      {
        withAuth: { username, password },
      }
    )

    // Create the node--article resource with the media--image relationship.
    const article = await drupal.createResource<DrupalNode>(
      "node--article",
      {
        data: {
          attributes: {
            title: fields.title,
            body: {
              value: fields.body,
              format: "full_html",
            },
          },
          relationships: {
            field_media_image: {
              data: {
                type: "media--image",
                id: media.id,
              },
            },
          },
        },
      },
      {
        withAuth: { username, password },
        params: new DrupalJsonApiParams()
          .addFields("node--article", ["title"])
          .getQueryObject(),
      }
    )
    console.debug(res)

    // The article has been created.
    // Return the article resource.
    res.json(article)
  } catch (error) {
    if (error instanceof JsonApiErrors) {
      return res.status(error.statusCode).json(error.errors)
    }
    res.status(500).json({ message: "Something went wrong. Please try again." })
  }
}
