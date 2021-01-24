import React from 'react'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import ParseMarkdown from '../components/ParseMarkdown'

export default ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/use-cases/" } }) {
        edges {
          node {
            id
            frontmatter {
              date
              subtitle
              title
              description
              keywords
              socialShareImage
              use_cases {
                label
                uc_body
              }
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('use-cases', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
          md={{ size: 8, offset: 2 }}
          lg={{ size: 6, offset: 3 }}
        >
          <h1>{pageData.frontmatter.title}</h1>
          <h2>{pageData.frontmatter.subtitle}</h2>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col
          className="col-image"
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
          lg={{ size: 5, offset: 1 }}
          xl={{ size: 5, offset: 1 }}
        >
          <div className="use-cases">
            {pageData.frontmatter.use_cases.map((el, i) => {
              return (
                <div className="use-case" key={`use-case-${i}`}>
                  <h3>{el.label}</h3>
                  <ParseMarkdown>{el.uc_body}</ParseMarkdown>
                </div>
              )
            })}
          </div>
        </Col>
      </Row>
    </Layout>
  )
}
