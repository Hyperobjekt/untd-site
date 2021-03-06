import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import { BrushStroke, HubLogo, ScrollDown } from '../components/atoms/icons'
import heroImage1 from '../images/about_hero1.png'
// import heroImage2 from '../images/home_hero6.png'
import { basicStagger, basicStaggerChild, basicStaggerChildLeft } from '../components/atoms/animation'

const AboutHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="about-hero bg-gray" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 align-items-center">
          <Col
            xs={{ size: 8, offset: 2 }}
            sm={{ size: 4, offset: 0 }}
            md={{ size: 4, offset: 0 }}
            lg={{ size: 3, offset: 1 }}
            xl={{ size: 3, offset: 1 }}
          >
            <motion.div
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
              className="about-hero__image"
            >
              <motion.img
                variants={basicStaggerChildLeft}
                src={heroImage1}
                alt="hero image"
              />
              <Link to="/" className="logo">
                <HubLogo />
              </Link>
            </motion.div>
          </Col>
          <Col
            sm={{ size: 8, offset: 0 }}
            md={{ size: 8, offset: 0 }}
            lg={{ size: 8, offset: 0 }}
            xl={{ size: 8, offset: 0 }}
          >
            <motion.div
              className="about-hero__text"
              variants={basicStaggerChild}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <h1 className="sr-only">About</h1>
              <MDXRenderer>{pageData.frontmatter.heroText}</MDXRenderer>
              <a href="#about-the-center">
                <ScrollDown />
                <span className="dotted-bottom">Click here to learn more about the Center</span>
              </a>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const AboutBodyRow = ({ rowData, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="about-row" ref={ref}>
      <Row
        className={`align-items-center flex-column-reverse ${
          index % 2 > 0
            ? 'flex-sm-row'
            : 'flex-sm-row-reverse justify-content-end'
        }`}
      >
        <Col
          sm={{ size: 7, offset: index % 2 > 0 ? 0 : 1 }}
          md={{ size: 7, offset: index % 2 > 0 ? 0 : 1 }}
          lg={{ size: 5, offset: index % 2 > 0 ? 0 : 2 }}
          xl={{ size: 5, offset: index % 2 > 0 ? 0 : 2 }}
        >
          <motion.div
            className="about-row__text"
            variants={basicStaggerChild}
            animate={inView ? 'show' : 'hide'}
            initial="hide"
          >
            <MDXRenderer>{rowData.rowText}</MDXRenderer>
          </motion.div>
        </Col>
        <Col
          xs={{ size: 8, offset: 0 }}
          sm={{ size: 4, offset: index % 2 > 0 ? 1 : 0 }}
          md={{ size: 4, offset: index % 2 > 0 ? 1 : 0 }}
          lg={{ size: 3, offset: index % 2 > 0 ? 2 : 1 }}
          xl={{ size: 3, offset: index % 2 > 0 ? 2 : 1 }}
        >
          <motion.div
            variants={basicStagger}
            animate={inView ? 'show' : 'hide'}
            initial="hide"
            className="about-row__image"
          >
            <motion.div variants={basicStaggerChild}>
              <Img className="w-100" fluid={rowData.rowImage.childImageSharp.fluid} />
            </motion.div>
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}

const AboutBody = ({ pageData }) => {
  return (
    <div className="about-body">
      <Container fluid="sm">
        {pageData.frontmatter.contentRows.map((row, index) => (
          <AboutBodyRow rowData={row} index={index} key={index} />
        ))}
      </Container>
    </div>
  )
}

const AboutFullWidth = ({ pageData }) => {
  return (
    <div className="about-full">
      <Img className="w-100" fluid={pageData.frontmatter.fullWidthImage.childImageSharp.fluid} />
      <div className="about-full__text">
        <MDXRenderer>{pageData.frontmatter.fullWidthText}</MDXRenderer>
      </div>
    </div>
  )
}

const AboutResearch = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="about-research" ref={ref}>
      <Container fluid="sm">
        <Row>
          <Col
            sm={{ size: 12, offset: 0 }}
            md={{ size: 3, offset: 0 }}
            lg={{ size: 4, offset: 0 }}
            xl={{ size: 4, offset: 0 }}
          >
            <motion.div
              className="about-research__text"
              variants={basicStaggerChild}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <MDXRenderer>{pageData.frontmatter.researchHeading}</MDXRenderer>
              <BrushStroke />
            </motion.div>
          </Col>
          <Col
            sm={{ size: 10, offset: 1 }}
            md={{ size: 8, offset: 1 }}
            lg={{ size: 6, offset: 2 }}
            xl={{ size: 5, offset: 2 }}
          >
            <motion.div
              className="about-research__text"
              variants={basicStaggerChild}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <MDXRenderer>
                {pageData.frontmatter.researchSubheading}
              </MDXRenderer>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const AboutTheCenter = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="about-center" id="about-the-center" ref={ref}>
      <div className="about-center__intro bg-gray">
        <Container fluid="sm">
          <Row>
            <Col
              sm={{ size: 10 }}
              md={{ size: 8 }}
              lg={{ size: 8 }}
              xl={{ size: 8 }}
            >
              <MDXRenderer>
                {pageData.frontmatter.aboutTheCenterIntro}
              </MDXRenderer>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="about-full">
        <Img className="w-100" fluid={pageData.frontmatter.aboutTheCenterImageLarge.childImageSharp.fluid} />
      </div>
      <div className="about-center__content">
        <Container fluid="sm">
          <Row className="flex-column-reverse flex-md-row">
            <Col
              sm={{ size: 10, offset: 1 }}
              md={{ size: 8, offset: 0 }}
              lg={{ size: 6, offset: 1 }}
              xl={{ size: 6, offset: 1 }}
            >
              <motion.div
                variants={basicStaggerChild}
                animate={inView ? 'show' : 'hide'}
                initial="hide"
              >
                <MDXRenderer>
                  {pageData.frontmatter.aboutTheCenterContent}
                </MDXRenderer>
              </motion.div>
            </Col>
            <Col
              sm={{ size: 10, offset: 1 }}
              md={{ size: 3, offset: 1 }}
              lg={{ size: 4, offset: 1 }}
              xl={{ size: 4, offset: 1 }}
            >
              <motion.div
                className="about-center__image"
                variants={basicStaggerChild}
                animate={inView ? 'show' : 'hide'}
                initial="hide"
              >
                <Img className="w-100" fluid={pageData.frontmatter.aboutTheCenterImageSmall.childImageSharp.fluid} />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

const AboutPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/about/" } }) {
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
              heroText
              contentRows {
                rowText
                rowImage {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              fullWidthImage {
                childImageSharp {
                  fluid(maxWidth: 1200, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              fullWidthText
              researchHeading
              researchSubheading
              aboutTheCenterIntro
              aboutTheCenterContent
              aboutTheCenterImageLarge {
                childImageSharp {
                  fluid(maxWidth: 1200, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              aboutTheCenterImageSmall {
                childImageSharp {
                  fluid(maxWidth: 1200, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
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

  const pageMeta = getPageMeta('about', pageData, location)
  pageMeta.image = getPageData.metaImage.childImageSharp.original.src

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <AboutHero pageData={pageData} />
      <AboutBody pageData={pageData} />
      <AboutFullWidth pageData={pageData} />
      <AboutResearch pageData={pageData} />
      <AboutTheCenter pageData={pageData} />
    </Layout>
  )
}

export default AboutPage
