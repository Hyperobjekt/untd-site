import React, { useCallback, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MdKeyboardArrowDown } from 'react-icons/md'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import Image from '../components/atoms/image'
import { BrushStroke } from '../components/atoms/icons'
import { basicStagger, basicStaggerChild, libraryEntry, topicsDropdown } from '../components/atoms/animation'

import heroImage1 from '../images/untd-library1.png'
import heroImage2 from '../images/untd-library2.png'
import heroImage3 from '../images/untd-library3.png'
import heroImage4 from '../images/untd-library4.png'
import heroImage5 from '../images/untd-library5.png'

const LibraryHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  return (
    <div className="library-hero bg-darkgray" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 align-items-center">
          <Col
            xs={{size: 8, offset: 2}}
            sm={{size: 5, offset: 0}}
            md={{size: 5, offset: 0}}
            lg={{size: 4, offset: 1}}
            xl={{size: 4, offset: 1}}
          >
            {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
            <motion.div variants={basicStagger} animate={inView ? 'show' : 'hide'} initial="hide" className="library-hero__image">
              <motion.img variants={basicStaggerChild} src={heroImage1} alt="hero image" />
              <motion.img variants={basicStaggerChild} src={heroImage2} alt="hero image" />
              <motion.img variants={basicStaggerChild} src={heroImage3} alt="hero image" />
              <motion.img variants={basicStaggerChild} src={heroImage4} alt="hero image" />
              <motion.img variants={basicStaggerChild} src={heroImage5} alt="hero image" />
            </motion.div>
          </Col>
          <Col 
            sm={{size: 7, offset: 0}}
            md={{size: 6, offset: 1}}
            lg={{size: 6, offset: 1}}
            xl={{size: 6, offset: 1}}
          >
            <motion.div className="library-hero__text" variants={basicStaggerChild} animate={inView ? 'show' : 'hide'} initial="hide">
              <MDXRenderer>{pageData.frontmatter.libraryHeroText}</MDXRenderer>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const LibraryDescription = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  return (
    <div className="library-description" ref={ref}>
      <Container fluid="sm">
        <Row className="align-items-center flex-column-reverse flex-sm-row">
          <Col 
            sm={{size: 6, offset: 0}}
            md={{size: 6, offset: 0}}
            lg={{size: 6, offset: 0}}
            xl={{size: 6, offset: 0}}
          >
            <motion.div className="library-description__text" variants={basicStaggerChild} animate={inView ? 'show' : 'hide'} initial="hide">
              <MDXRenderer>{pageData.frontmatter.libraryDescription}</MDXRenderer>
            </motion.div>
          </Col>
          <Col
            xs={{size: 8, offset: 0}}
            sm={{size: 6, offset: 0}}
            md={{size: 5, offset: 1}}
            lg={{size: 4, offset: 1}}
            xl={{size: 4, offset: 1}}
          >
            <motion.div variants={basicStagger} animate={inView ? 'show' : 'hide'} initial="hide" className="library-description__image">
              <motion.div variants={basicStaggerChild}>
                <Image className="h-100 w-100" filename={pageData.frontmatter.libraryDescriptionImage} />
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const LibraryTopics = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true
  })
  const [activeTopic, setActiveTopic] = useState(0)

  const [dropdownOpen, setDropdownOpen] = useState(() => window.innerWidth < 576 ? false : true)

  const toggleDropdown = useCallback(() => {
    if(window.innerWidth < 576) {
      setDropdownOpen(ddOpen => !ddOpen)
    }
  }, [])

  return (
    <div className="library-topics" ref={ref}>
      <div className="library-topics__heading bg-gray">
        <Container fluid="sm">
          <Row className="align-items-center">
            <Col
              xs={{size: 8, offset: 2}}
              sm={{size: 4, offset: 0}}
              md={{size: 3, offset: 0}}
              lg={{size: 3, offset: 0}}
              xl={{size: 3, offset: 0}}
            >
              <motion.div variants={basicStagger} animate={inView ? 'show' : 'hide'} initial="hide" className="library-topics__heading-image">
                <motion.div variants={basicStaggerChild}>
                  <Image className="h-100 w-100" filename={pageData.frontmatter.libraryTopicsHeadingImage} />
                </motion.div>
              </motion.div>
            </Col>
            <Col
              sm={{size: 7, offset: 1}}
              md={{size: 8, offset: 1}}
              lg={{size: 8, offset: 1}}
              xl={{size: 8, offset: 1}}
            >
              <MDXRenderer>{pageData.frontmatter.libraryTopicsHeading}</MDXRenderer>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="library-topics__body">
        <Container fluid="sm">
          <Row className="flex-column flex-sm-row">
            <Col
              sm={{size: 5, offset: 0}}
              md={{size: 4, offset: 0}}
              lg={{size: 3, offset: 0}}
              xl={{size: 3, offset: 0}}
              className="library-topics__sidebar"
            >
              <div onClick={toggleDropdown} role="toggle dropdown">
                <h3 className="knockout-bold">Topics</h3>
                <h4 className="knockout-bold">Choose Topic <MdKeyboardArrowDown className={`${dropdownOpen ? 'open' : ''}`} /></h4>
                <BrushStroke />
                <motion.div variants={topicsDropdown} initial={dropdownOpen ? "show" : "hide"} animate={dropdownOpen ? "show" : "hide"} className="library-topics__sidebar-links">
                  <div>
                    {pageData.frontmatter.researchItems.map((item, i) => (
                      <a role="set active topic" onClick={() => setActiveTopic(i)} className={`library-topics__topic ${i === activeTopic ? 'library-topics__topic--active' : ''}`} key={i}>
                        <div style={{"--color": item.item_color}}></div>
                        <span className="caslon">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </Col>
            <Col
              sm={{size: 7, offset: 0}}
              md={{size: 7, offset: 1}}
              lg={{size: 6, offset: 2}}
              xl={{size: 6, offset: 2}}
              className="library-topics__entries"
            >
              {pageData.frontmatter.researchItems.map((item, i) => (
                <motion.div className="library-topics__entry" key={i} id={slugify(item.label)} variants={libraryEntry} style={{position: i === activeTopic ? 'relative' : 'absolute'}} animate={i === activeTopic ? 'show' : 'hide'}>
                  <MDXRenderer>{item.item_content}</MDXRenderer>
                </motion.div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

const slugify = string => string.split(" ").map(ss => ss.toLowerCase()).join("-")


const SessionsPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/research-library/" } }) {
        edges {
          node {
            id
            frontmatter {
              date
              subtitle
              title
              description
              keywords
              socialShareImage
              libraryHeroText
              libraryDescription
              libraryDescriptionImage
              libraryTopicsHeading
              libraryTopicsHeadingImage
              researchItems {
                label
                topic_area
                type
                link
                quick_citation
                authors
                year
                full_citation
                item_color
                item_content
              }
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node
  // console.log('research-lib pageData', pageData)
  const pageMeta = getPageMeta('research-library', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <LibraryHero pageData={pageData} />
      <LibraryDescription pageData={pageData} />
      <LibraryTopics pageData={pageData} />
      {/* <Row className="heading">
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
          {pageData.frontmatter.researchItems.map((el, i) => {
            return (
              <div className="research-item" key={`research-item-${i}`}>
                <h4>
                  {el.label} <span className="tag-topic">{el.topic_area}</span>
                </h4>

                <a
                  className="tag-topic"
                  href={el.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {el.link}
                </a>
              </div>
            )
          })}
        </Col>
      </Row> */}
    </Layout>
  )
}

export default SessionsPage
