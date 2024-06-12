import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { NodeEventTeaser } from "components/node--event--teaser"
import { PageHeader } from "components/page-header"

interface EventPageProps extends LayoutProps {
  events: DrupalNode[]
}

export default function EventsPage({
  events,
  menus,
  blocks,
}: EventPageProps) {

  return (
    <Layout
      menus={menus} blocks={blocks}
      meta={{
        title: "Events",
      }}
    >
      <PageHeader
        heading="events"
        breadcrumbs={[
          {
            title: "events",
          },
        ]}
      />
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <NodeEventTeaser key={event.id} node={event} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<EventPageProps>> {
  // Fetch all published events sorted by date.
  const events = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    {
      params: getParams("node--event", "card")
        .addSort("created", "DESC")
        .getQueryObject(),
    }
  )



  return {
    props: {
      ...(await getGlobalElements(context)),
      events,
      blocks
    },
  }
}
