import React from 'react'
import { Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'

const NotFoundPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/404/" } }) {
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
  // console.log(getPageData.allMdx.edges[0].node)

  const pageMeta = getPageMeta('404', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Row className="heading">
        <Col xs={{ size: 10, offset: 1 }} sm={{ size: 6, offset: 3 }}>
          <h1>{pageData.frontmatter.title}</h1>
          <h1>{pageData.frontmatter.subtitle}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 10, offset: 1 }} sm={{ size: 6, offset: 3 }}>
          <MDXRenderer>{pageData.body}</MDXRenderer>
        </Col>
      </Row>
    </Layout>
  )
}

export default NotFoundPage
