import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Row, Col } from 'reactstrap'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'

const EventsPage = ({ location }) => {
  const pageMeta = {
    title: 'FAQ',
    type: 'faq',
    location: location,
    description: null,
    keywords: `faq`,
    image: null,
    url: `${location.href}`,
  }

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>FAQ</h1>
        </Col>
      </Row>
      <p>FAQ page</p>
    </Layout>
  )
}

export default EventsPage
