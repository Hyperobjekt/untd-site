import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import ContactForm from './../components/molecules/contactForm/contactForm'
import heroImage1 from '../images/contact-hero1.png'
import heroImage2 from '../images/contact-hero2.png'
import { basicStagger, basicStaggerChild } from '../components/atoms/animation'
import { HubLogo } from '../components/atoms/icons'

const ContactUsHero = ({pageData}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="bg-gray contact-hero" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 flex-column-reverse flex-sm-row align-items-center">
          <Col
            sm={{ size: 6, offset: 1 }}
            md={{ size: 6, offset: 1 }}
            lg={{ size: 6, offset: 1 }}
            xl={{ size: 5, offset: 1 }}
          >
            <motion.div
              className="contact-hero__text"
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <motion.h1
                variants={basicStaggerChild}
                className="text-uppercase knockout-bold"
              >
                Contact Us
              </motion.h1>
              <MDXRenderer>{pageData.body}</MDXRenderer>
            </motion.div>
          </Col>
          <Col
            xs={{ size: 8 }}
            sm={{ size: 4, offset: 1 }}
            md={{ size: 4, offset: 1 }}
            lg={{ size: 3, offset: 1 }}
            xl={{ size: 3, offset: 1 }}
          >
            {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
            <motion.div
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
              className="contact-hero__image"
            >
              <motion.img
                variants={basicStaggerChild}
                src={heroImage1}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChild}
                src={heroImage2}
                alt="hero image"
              />
              <Link to="/" className="logo">
                <HubLogo />
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const ContactUsBody = () => (
  <Container fluid="sm" className="contact-body">
    <Row className="py-5">
      <Col
        sm={{ size: 10, offset: 1 }}
        md={{ size: 10, offset: 1 }}
        lg={{ size: 8, offset: 2 }}
        xl={{ size: 8, offset: 2 }}
      >
        <ContactForm />
      </Col>
    </Row>
  </Container>
)

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
      metaImage: file(relativePath: { eq: "social-share.png" }) {
        id
        childImageSharp {
          original {
            src
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('contact', pageData, location)
  pageMeta.image = getPageData.metaImage.childImageSharp.original.src

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <ContactUsHero pageData={pageData} />
      <ContactUsBody />
    </Layout>
  )
}

export default ContactPage
