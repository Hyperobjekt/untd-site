import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'gatsby'

import { HubLogo } from '../components/atoms/icons'
import heroImage1 from '../images/about_hero1.png'
import { basicStagger, basicStaggerChild } from '../components/atoms/animation'
import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'

const NotFoundHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="hero bg-gray" ref={ref}>
      <Row className="py-5 align-items-center">
        <Col
          xs={{ size: 12, offset: 0 }}
          md={{ size: 2, offset: 1 }}
          className="col"
        >
          {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
          <motion.div
            variants={basicStagger}
            animate={inView ? 'show' : 'hide'}
            initial="hide"
            className="hero__image"
          >
            <Link to="/" className="logo">
              <HubLogo />
            </Link>
          </motion.div>
        </Col>
        <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 1 }}>
          <motion.div
            className="hero__text"
            variants={basicStaggerChild}
            animate={inView ? 'show' : 'hide'}
            initial="hide"
          >
            <h1>{pageData.frontmatter.title}</h1>
            <h2>{pageData.frontmatter.subtitle}</h2>
            <MDXRenderer>{pageData.body}</MDXRenderer>
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}

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
      <NotFoundHero pageData={pageData} />
      <form
        name="map_feedback"
        method="POST"
        netlify-honeypot="bot-field"
        data-netlify="true"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="form-name" value="map_feedback" />
        <p className="hidden" style={{ visibility: 'hidden', height: 0 }}>
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        <input id="latitude" name="latitude" type="text" />
        <input id="longitude" name="longitude" type="text" />
        <input id="address" name="address" type="text" />
        <input id="firstname" name="firstname" type="text" />
        <input id="lastname" name="lastname" type="text" />
        <input id="email" name="email" type="email" />
        <textarea id="message" name="message" type="text" rows="4" />
      </form>
    </Layout>
  )
}

export default NotFoundPage
