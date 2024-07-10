import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { Breadcrumbs } from "./breadcrumbs"
import { PageHeader } from "./page-header"
import { NodeEventTeaser } from "./node--event--teaser"

export interface TaxonomyTermEventCategoryProps {
  term: DrupalTaxonomyTerm
  additionalContent: {
    termContent: DrupalNode[]
  }
}

export function TaxonomyTermEventCategory({
  term,
  additionalContent,
}: TaxonomyTermEventCategoryProps) {

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            title: term.name,
          },
        ]}
      />
      <PageHeader heading={term.name} />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {additionalContent?.termContent.map((event) => (
          <NodeEventTeaser key={event.id} node={event} />
        ))}
      </div>
    </div>
  )
}
