import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'

const IndexPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          subtitle
          copyrightDate
          description
          menu {
            path
            title
          }
        }
      }
    }
  `)

  const pageMeta = {
    title: 'Home',
    type: 'home',
    location: location,
    description: null,
    keywords: `TODO`,
    image: null,
    url: `${location.href}`,
  }

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="jumbotron align-items-center">
        <Col>
          <h1>{getPageData.site.siteMetadata.title}</h1>
          <p>{getPageData.site.siteMetadata.subtitle}</p>
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
