import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import Image from '../components/atoms/image'
import { BrushStroke } from '../components/atoms/icons'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import heroImage1 from '../images/about_hero1.png'
import heroImage2 from '../images/home_hero6.png'

const basicStagger = {
  show: {
    transition: {
      delayChildren: 1,
      duration: 0.75, 
      staggerChildren: 0.2
    }
  },
  hide: {
    transition: {
      duration: 0.75, 
      staggerChildren: 0.2
    }
  }
}

const basicStaggerChild = {
  show: {
    opacity: 1,
    y: 0
  },
  hide: {
    opacity: 0,
    y: 10
  }
}

const AboutHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  return (
    <div className="about-hero bg-gray" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 align-items-center">
          <Col
            sm={{size: 4, offset: 0}}
            md={{size: 4, offset: 0}}
            lg={{size: 3, offset: 1}}
            xl={{size: 3, offset: 1}}
          >
            {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
            <motion.div variants={basicStagger} animate={inView ? 'show' : 'hide'} initial="hide" className="about-hero__image">
              <motion.img variants={basicStaggerChild} src={heroImage1} alt="hero image" />
              <motion.img variants={basicStaggerChild} src={heroImage2} alt="hero image" />
            </motion.div>
          </Col>
          <Col 
            sm={{size: 8, offset: 0}}
            md={{size: 8, offset: 0}}
            lg={{size: 8, offset: 0}}
            xl={{size: 8, offset: 0}}
          >
            <motion.div className="about-hero__text" variants={basicStaggerChild} animate={inView ? 'show' : 'hide'} initial="hide">
              <MDXRenderer>{pageData.frontmatter.heroText}</MDXRenderer>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const AboutBodyRow = ({ rowData, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  return (
    <div className="about-row" ref={ref}>
      <Row className={`align-items-center ${index % 2 > 0 ? '' : 'flex-md-row-reverse justify-content-end'}`} >
        <Col 
          sm={{size: 5, offset: index % 2 > 0 ? 0 : 2}}
          md={{size: 5, offset: index % 2 > 0 ? 0 : 2}}
          lg={{size: 5, offset: index % 2 > 0 ? 0 : 2}}
          xl={{size: 5, offset: index % 2 > 0 ? 0 : 2}}
        >
          <motion.div className="about-row__text" variants={basicStaggerChild} animate={inView ? 'show' : 'hide'} initial="hide">
            <MDXRenderer>{rowData.rowText}</MDXRenderer>
          </motion.div>
        </Col>
        <Col
          sm={{size: 4, offset: 0}}
          md={{size: 4, offset: 0}}
          lg={{size: 3, offset: 1}}
          xl={{size: 3, offset: 1}}
        >
          {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
          <motion.div variants={basicStagger} animate={inView ? 'show' : 'hide'} initial="hide" className="about-row__image">
            <motion.div variants={basicStaggerChild}>
              <Image className="h-100 w-100" filename={rowData.rowImage} />
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
          <AboutBodyRow rowData={row} index={index} />
        ))}
      </Container>
    </div>
  )
}

const AboutFullWidth = ({ pageData }) => {

  return (
    <div className="about-full">
      <Image className="w-100" filename={pageData.frontmatter.fullWidthImage} />
      <div className="about-full__text">
        <MDXRenderer>{pageData.frontmatter.fullWidthText}</MDXRenderer>
      </div>
    </div>
  )
}

const AboutResearch = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  return (
    <div className="about-research" ref={ref}>
      <Container fluid="sm">
        <Row className="align-items-center">
          <Col 
            sm={{size: 6, offset: 4}}
            md={{size: 6, offset: 4}}
            lg={{size: 6, offset: 4}}
            xl={{size: 6, offset: 4}}
          >
            <motion.div className="about-research__text" variants={basicStaggerChild} animate={inView ? 'show' : 'hide'} initial="hide">
              <MDXRenderer>{pageData.frontmatter.researchHeading}</MDXRenderer>
              <BrushStroke />
              <MDXRenderer>{pageData.frontmatter.researchSubheading}</MDXRenderer>
            </motion.div>
          </Col>
        </Row>
      </Container>
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
              socialShareImage
              heroText
              contentRows {
                rowText
                rowImage
              }
              fullWidthImage
              fullWidthText
              researchHeading
              researchSubheading
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('about', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <AboutHero pageData={pageData} />
      <AboutBody pageData={pageData} />
      <AboutFullWidth pageData={pageData} />
      <AboutResearch pageData={pageData} />
    </Layout>
  )
}

export default AboutPage
