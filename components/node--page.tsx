import { DrupalNode } from 'next-drupal'
import { Breadcrumbs } from 'components/breadcrumbs'
import { FormattedText } from './formatted-text'
import { PageHeader } from './page-header'

interface NodePageProps {
  node: DrupalNode
}

export function NodePage({ node }: NodePageProps) {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: node.title
          }
        ]}
      />
          <article className="bg-white text-text p-4">
            <PageHeader heading={node.title} />

            <div className="mt-4 prose prose-a:text-link max-w-none text-text">
              {node.body?.processed && <FormattedText text={node.body.processed} />}
            </div>
          </article>
    </>
  )
}
