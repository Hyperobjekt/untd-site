import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Row, Col, Button } from 'reactstrap'
import { MdKeyboardArrowDown } from 'react-icons/md'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'

const AboutPage = ({ location }) => {
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
    title: 'About',
    type: 'about',
    location: location,
    description: null,
    keywords: `TODO`,
    image: null, // TODOt
    url: `${location.href}`,
  }

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>Heading</h1>
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
