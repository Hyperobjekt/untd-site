import React from 'react'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'

const IndexPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/home/" } }) {
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
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('home', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="jumbotron align-items-center">
        <Col>
          <h1>{pageData.frontmatter.title}</h1>
          <p>{pageData.frontmatter.subtitle}</p>
        </Col>
      </Row>
      <Row className="testimonials">
        <Col
          className="col-content"
          xs={{ size: 10, offset: 1 }}
          md={{ size: 5, offset: 1 }}
          lg={{ size: 5, offset: 1 }}
          xl={{ size: 5, offset: 1 }}
        >
          <p>content</p>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage
