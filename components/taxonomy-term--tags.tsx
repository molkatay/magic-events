import * as React from "react"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { Breadcrumbs } from "./breadcrumbs"
import { PageHeader } from "./page-header"
import { NodeEventTeaser } from "./node--event--teaser"
import { NodeArticleCard } from "./node--article--card"

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
