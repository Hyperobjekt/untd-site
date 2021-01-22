import React from 'react'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import ContactForm from './../components/molecules/contactForm/contactForm'

const ContactPage = ({ location }) => {
  const pageMeta = {
    title: 'Contact',
    type: 'contact',
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
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>{pageMeta.title}</h1>
        </Col>
      </Row>
      <div className="row">
        <div className="col-form col-12 col-sm-10 offset-sm-1 col-lg-5">
          <p>Use this form to contact us...</p>
          <ContactForm />
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
