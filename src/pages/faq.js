import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Row, Col } from 'reactstrap'

import Layout from '../components/layout'
import ParseMarkdown from '../components/ParseMarkdown'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'

const FaqPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/faq/" } }) {
        edges {
          node {
            id
            body
            frontmatter {
              date
              subtitle
              title
              description
              keywords
              socialShareImage
              content_items {
                content
                label
              }
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('faq', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>{pageData.frontmatter.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {pageData.frontmatter.content_items.map((el, i) => {
            return (
              <div className="item" key={`faq-item-${i}`}>
                <h3>{el.label}</h3>
                <ParseMarkdown>{el.content}</ParseMarkdown>
              </div>
            )
          })}
        </Col>
      </Row>
    </Layout>
  )
}

export default FaqPage
