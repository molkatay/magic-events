import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { NextApiRequest, NextApiResponse } from "next"

import { drupal } from "lib/drupal"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return res.status(405).end()
    }

    // The body field will contain the keys.
    const body = JSON.parse(req.body)

    // Make a request to Drupal JSON:API to search for resources.
    // We're going to search for articles or events.
    // Note: We normally recommend using Search API for searching Drupal.
    // Since core search does not have full JSON:API support.

    // We need to make two requests.
    // 1. Search all events with the search keys.
    const events = await drupal.getResourceCollection("node--event", {
      params: new DrupalJsonApiParams()
        .addFields("node--event", ["title", "path", "created"])
        .addFilter("title", body.keys, "CONTAINS")
        .getQueryObject(),
    })

    // 2. Search all articles with the search keys.
    const articles = await drupal.getResourceCollection("node--article", {

      params: new DrupalJsonApiParams()
        .addFields("node--article", ["title", "path", "created"])
        .addFilter("title", body.keys, "CONTAINS")
        .getQueryObject(),
    })

    res.json([...events, ...articles])
  } catch (error) {
    res.status(500).end(error)
  }
}
