import * as React from "react"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { Breadcrumbs } from "components/breadcrumbs"
import { PageHeader } from "components/page-header"
import { NodeEventTeaser } from "components/node--event--teaser"
import { NodeArticleCard } from "components/node--article--card"

export interface TaxonomyTermTagsProps {
  term: DrupalTaxonomyTerm
  additionalContent: {
    termContent: DrupalNode[]
  }
}

export function TaxonomyTermTags({
  term,
  additionalContent,
}: TaxonomyTermTagsProps) {

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
        {additionalContent?.termContent.map((node) => (
          <React.Fragment key={node.id}>
            {node.type === "node--event" && <NodeEventTeaser node={node} />}
            {node.type === "node--article" && <NodeArticleCard node={node} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
