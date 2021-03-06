import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Row, Col, Container } from 'reactstrap'
import { useInView } from 'react-intersection-observer'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { motion } from 'framer-motion'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from '../utils/utils'
import { BrushStroke, HubLogo } from '../components/atoms/icons'

import heroImage1 from '../images/cases1.png'
import heroImage2 from '../images/cases2.png'
import heroImage3 from '../images/cases3.png'
import heroImage4 from '../images/untd-library2.png'
import heroImage5 from '../images/cases5.png'
import { basicStagger, basicStaggerChild, basicStaggerChildLeft, basicStaggerChildDown, basicStaggerChildRight, basicStaggerChildStatic } from '../components/atoms/animation'

const CasesHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="bg-darkgray cases-hero" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 flex-column-reverse flex-sm-row align-items-center">
          <Col
            sm={{ size: 7, offset: 0 }}
            md={{ size: 6, offset: 1 }}
            lg={{ size: 5, offset: 1 }}
            xl={{ size: 4, offset: 1 }}
          >
            <motion.div
              className="cases-hero__text"
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <h1><motion.span variants={basicStaggerChild}>Pathways</motion.span> <motion.span variants={basicStaggerChild}>To</motion.span> <motion.span variants={basicStaggerChild}>Mobility</motion.span></h1>
              <motion.div variants={basicStaggerChild}>
                <MDXRenderer>{pageData.frontmatter.heroText}</MDXRenderer>
              </motion.div>
            </motion.div>
          </Col>
          <Col
            xs={{ size: 10 }}
            sm={{ size: 4, offset: 0 }}
            md={{ size: 4, offset: 0 }}
            lg={{ size: 4, offset: 1 }}
            xl={{ size: 4, offset: 1 }}
          >
            {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
            <motion.div
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
              className="cases-hero__image"
            >
              <motion.img
                variants={basicStaggerChildLeft}
                src={heroImage1}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChild}
                src={heroImage2}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChildRight}
                src={heroImage3}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChildDown}
                src={heroImage4}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChildStatic}
                src={heroImage5}
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

const CasesBodyRow = ({ rowData, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="cases-row" ref={ref}>
      <Row
        className={`align-items-center flex-nowrap flex-column-reverse ${
          index % 2 === 0 ? 'flex-sm-row-reverse' : 'flex-sm-row'
        }`}
      >
        <Col
          sm={{ size: 5, offset: index % 2 === 0 ? 1 : 0 }}
          md={{ size: 5, offset: index % 2 === 0 ? 1 : 0 }}
          lg={{ size: 5, offset: index % 2 === 0 ? 1 : 0 }}
          xl={{ size: 5, offset: index % 2 === 0 ? 1 : 0 }}
        >
          <motion.div
            className="cases-row__text"
            variants={basicStaggerChild}
            animate={inView ? 'show' : 'hide'}
            initial="hide"
          >
            <MDXRenderer>{rowData.rowText}</MDXRenderer>
          </motion.div>
        </Col>
        <Col
          sm={{ size: 7, offset: index % 2 === 0 ? -1 : 1 }}
          md={{ size: 7, offset: index % 2 === 0 ? -1 : 1 }}
          lg={{ size: 7, offset: index % 2 === 0 ? -1 : 1 }}
          xl={{ size: 7, offset: index % 2 === 0 ? -1 : 1 }}
        >
          {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
          <motion.div
            variants={basicStagger}
            animate={inView ? 'show' : 'hide'}
            initial="hide"
            className="cases-row__image"
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

const CasesBody = ({ pageData }) => {
  return (
    <div className="cases-rows">
      <Container fluid="sm">
        {pageData.frontmatter.useCasesRows.map((row, index) => (
          <CasesBodyRow rowData={row} index={index} key={index} />
        ))}
      </Container>
    </div>
  )
}

const Worksheets = ({ pageData }) => {
  return (
    <div className="worksheets">
      <Container fluid="sm">
        <Row>
          <div className="worksheets__heading">
            <h2>{pageData.frontmatter.worksheetsHeading}</h2>
            <BrushStroke />
          </div>
        </Row>
        <div className="worksheets__list">
          {pageData.frontmatter.worksheets.map((sheetData, i) => (
            <Worksheet key={i} sheetData={sheetData} />
          ))}
        </div>
      </Container>
    </div>
  )
}

const Worksheet = ({ sheetData }) => {
  return (
    <Row>
      <div className="worksheet">
        <div className="worksheet__image">
          <Img className="w-100" fluid={sheetData.sheetImage.childImageSharp.fluid} />
        </div>
        <div className="worksheet__body">
          <h3 className="worksheet__body-eyebrow">{sheetData.sheetEyebrow}</h3>
          <div>
            <MDXRenderer>{sheetData.sheetText}</MDXRenderer>
          </div>
          <a href={sheetData.sheetFile} className="btn-orange">
            Download worksheet
          </a>
        </div>
      </div>
    </Row>
  )
}

export default ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/pathways-to-mobility/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              date
              subtitle
              title
              description
              keywords
              heroText
              useCasesRows {
                rowText
                rowImage {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              worksheetsHeading
              worksheets {
                sheetText
                sheetImage {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                sheetFile
                sheetEyebrow
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
  const pageMeta = getPageMeta('pathways-to-mobility', pageData, location)
  pageMeta.image = getPageData.metaImage.childImageSharp.original.src

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <CasesHero pageData={pageData} />
      <CasesBody pageData={pageData} />
      <Worksheets pageData={pageData} />
    </Layout>
  )
}
