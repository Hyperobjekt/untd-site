import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Row, Col } from 'reactstrap'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'

const AboutPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/about/" } }) {
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
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('about', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>{pageData.frontmatter.title}</h1>
          <h2>{pageData.frontmatter.subtitle}</h2>
        </Col>
      </Row>
      <Row className="content-row">
        <Col
          className="col-image"
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
        >
          <p>content row</p>
        </Col>
      </Row>
    </Layout>
  )
}

export default AboutPage
