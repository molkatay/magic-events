import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { NodeEventCard } from "components/node--event--card"
import { PageHeader } from "components/page-header"

interface EventsPageProps extends LayoutProps {
  events: DrupalNode[]
}

export default function EventsPage({
  events,
  menus,
  siteInfos
}: EventsPageProps) {

  return (
    <Layout
      menus={menus}
      meta={{
        title: 'Events'
      }}
      siteInfos={siteInfos}
    >

        <PageHeader
          heading={'Events'}
          breadcrumbs={[
            {
              title: 'Events'
            }
          ]}
        />

        <div className="container mx-auto py-5">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <NodeEventCard key={event.id} node={event} />
            ))}
          </div>
        </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<EventPageProps>> {
  // Fetch all published articles sorted by date.
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
    },
  }
}
