import React from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'

export default ({ location }) => {
  const pageMeta = {
    title: 'Use Cases',
    type: 'use-cases',
    location: location,
    description: null,
    keywords: `TODO`,
    image: null,
    url: `${location.href}`,
  }

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
      </Row>
      <Row className="align-items-center">
        <Col
          className="col-image"
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
          lg={{ size: 5, offset: 1 }}
          xl={{ size: 5, offset: 1 }}
        >
          <p>Content</p>
        </Col>
      </Row>
    </Layout>
  )
}
