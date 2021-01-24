import React from 'react'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'

const SessionsPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/research-library/" } }) {
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
              researchItems {
                label
                topic_area
                type
                link
                quick_citation
                authors
                year
                full_citation
              }
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node
  // console.log('research-lib pageData', pageData)
  const pageMeta = getPageMeta('research-library', pageData, location)

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
          <h1>{pageMeta.title}</h1>
        </Col>
        <Col
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
          md={{ size: 8, offset: 2 }}
          lg={{ size: 6, offset: 3 }}
        >
          {pageData.frontmatter.researchItems.map((el, i) => {
            return (
              <div className="research-item" key={`research-item-${i}`}>
                <h4>
                  {el.label} <span className="tag-topic">{el.topic_area}</span>
                </h4>

                <a
                  className="tag-topic"
                  href={el.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {el.link}
                </a>
              </div>
            )
          })}
        </Col>
      </Row>
    </Layout>
  )
}

export default SessionsPage
