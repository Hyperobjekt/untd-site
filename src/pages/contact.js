import React from 'react'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import ContactForm from './../components/molecules/contactForm/contactForm'

const ContactPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
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

  const pageMeta = getPageMeta('contact', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>{pageData.frontmatter.title}</h1>
        </Col>
      </Row>
      <div className="row">
        <div className="col-form col-12 col-sm-10 offset-sm-1 col-lg-5">
          <MDXRenderer>{pageData.body}</MDXRenderer>
          <ContactForm />
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
