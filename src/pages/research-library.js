import React from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'

const SessionsPage = ({ location }) => {
  const pageMeta = {
    title: 'Research Library',
    type: 'research-library',
    location: location,
    description: null,
    keywords: `research, library, research library`,
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
        <Col
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
          md={{ size: 8, offset: 2 }}
          lg={{ size: 6, offset: 3 }}
        >
          <p>content</p>
        </Col>
      </Row>
    </Layout>
  )
}

export default SessionsPage
