import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta, slugify } from './../utils/utils'
import Image from '../components/atoms/image'
import { CustomBackgroundImage as BackgroundImage } from '../components/atoms/bg-image'
import {
  Arrow,
  BrushStroke,
  HubLogo,
  InfoIcon,
} from '../components/atoms/icons'
import { basicStagger, basicStaggerChild, basicStaggerChildLeft, basicStaggerChildDown, basicStaggerChildRight, basicStaggerChildStatic } from '../components/atoms/animation'

import heroImage1 from '../images/home_hero1.png'
import heroImage2 from '../images/home_hero2.png'
import heroImage3 from '../images/home_hero3.png'
import heroImage4 from '../images/home_hero4.png'
import heroImage5 from '../images/home_hero5.png'
import cpalLogo from '../images/cpal-logo.png'

const HomeHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="bg-gray home-hero" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 align-items-center">
          <Col
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
              className="home-hero__image"
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
                variants={basicStaggerChildDown}
                src={heroImage3}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChildRight}
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
          <Col
            sm={{ size: 7, offset: 1 }}
            md={{ size: 7, offset: 1 }}
            lg={{ size: 6, offset: 1 }}
            xl={{ size: 5, offset: 1 }}
          >
            <motion.div
              className="home-hero__text"
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <motion.h1
                variants={basicStaggerChild}
                className="text-uppercase knockout-bold"
              >
                The neighborhoods
              </motion.h1>
              <motion.h2
                variants={basicStaggerChild}
                className="text-uppercase knockout"
              >
                you live in have a major impact on
              </motion.h2>
              <motion.h1
                variants={basicStaggerChild}
                className="text-uppercase knockout-bold"
              >
                <Link to="/research-library/" className="highlight">
                  social mobility
                </Link>
                <div className="home-hero__hint">
                  <Arrow />
                  <span className="knockout text-uppercase text-center">
                    Click on the highlighted words to go to the library
                  </span>
                </div>
              </motion.h1>
              <motion.p variants={basicStaggerChild}>
                {pageData.frontmatter.heroSubheading}
              </motion.p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const HomeGraph = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="home-graph" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5">
          <Col
            xs={{ size: 10, offset: 1 }}
            md={{ size: 8, offset: 2 }}
            lg={{ size: 6, offset: 3 }}
          >
            <div className="home-graph__cpal py-4">
              <p className="m-0">
                <span className="knockout text-uppercase">
                  In partnership with
                </span>
                <img alt="CPAL logo" src={cpalLogo} />
              </p>
            </div>
          </Col>
        </Row>
        <Row className="my-sm-5 py-sm-5 position-relative">
          <Col
            className="home-graph__text"
            xs={{ size: 12, offset: 0 }}
            md={{ size: 8, offset: 4 }}
            lg={{ size: 6, offset: 6 }}
            xl={{ size: 5, offset: 7 }}
          >
            <motion.div
              variants={basicStagger}
              initial="hide"
              animate={inView ? 'show' : 'hide'}
            >
              <motion.h3
                variants={basicStaggerChild}
                className="knockout-bold text-uppercase"
              >
                {pageData.frontmatter.graphHeading}
              </motion.h3>
              <motion.div variants={basicStaggerChild}>
                <BrushStroke />
              </motion.div>
              <motion.div variants={basicStaggerChild}>
                <MDXRenderer>
                  {pageData.frontmatter.graphSubheading}
                </MDXRenderer>
              </motion.div>
              <motion.p variants={basicStaggerChild} className="caslon">
                <Link to="/research-library/" className="dotted-bottom">
                  Read more
                </Link>
                <em>or</em>
                <Link to="/faq/" className="dotted-bottom">
                  go to FAQ page
                </Link>
              </motion.p>
            </motion.div>
          </Col>
          <Col className="home-graph__image" xs={{ size: 12, offset: 0 }}>
            <Image
              className="w-100"
              filename={pageData.frontmatter.graphImage}
            />
            <div className="home-graph__image-source">
              <div className="bg-gray">
                <InfoIcon />
                <span className="caslon ml-2">Source</span>
                <p>
                  <span>{pageData.frontmatter.graphCitation}</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const HomeLibraryCard = ({ cardData, index, topics }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <Row className="my-5" key={index}>
      <Col
        xs={{ size: 12, offset: 0 }}
        md={{ size: 12, offset: 0 }}
        lg={{ size: 11, offset: 0 }}
        className="py-5"
      >
        <div
          className="bg-gray flex-column-reverse flex-md-row home-engage__card home-engage__card--left"
          ref={ref}
        >
          <motion.div
            className="home-engage__card-content"
            variants={basicStagger}
            initial="hide"
            animate={inView ? 'show' : 'hide'}
          >
            <motion.h5
              variants={basicStaggerChild}
              className="knockout-bold text-uppercase"
            >{`${index + 1}. ${cardData.cardTitle}`}</motion.h5>
            <motion.div variants={basicStaggerChild}>
              <MDXRenderer>{cardData.cardHeading}</MDXRenderer>
            </motion.div>
            <motion.p variants={basicStaggerChild}>
              {cardData.cardSubheading}
            </motion.p>
            <motion.p variants={basicStaggerChild} className="caslon">
              {cardData.cardLinks.map((link, i) => (
                <Link to={link.linkUrl} className={`btn-orange${i > 0 ? ' secondary' : ''}`} key={i}>
                  {link.linkText}
                </Link>
              ))}
            </motion.p>
          </motion.div>
          <motion.div
            className="home-engage__card-topics"
            variants={basicStagger}
            initial="hide"
            animate={inView ? 'show' : 'hide'}
          >
            <motion.ul variants={basicStaggerChild}>
              {topics.map(({ label }, i) => (
                <li className={i < topics.length - 1 ? "dotted-bottom" : ""} key={i}>
                  <Link to={`/research-library/${slugify(label)}/`}>
                    <span className="caslon">{ label }</span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Col>
    </Row>
  )
}

const HomeExplorerCard = ({ cardData, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <Row className="my-5" key={index}>
      <Col
        xs={{ size: 12, offset: 0 }}
        md={{ size: 12, offset: index % 2 > 0 ? 1 : 0 }}
        lg={{ size: 11, offset: index % 2 > 0 ? 2 : 0 }}
        className="py-5"
      >
        <BackgroundImage alt="Explorer" filename={cardData.cardImage}>
          <div
            className={`${
              index % 2 > 0 ? '' : 'home-engage__card--left'
            } flex-column-reverse flex-md-row-reverse home-engage__card home-engage__card--explorer`}
            ref={ref}
          >
            <motion.div
              className="home-engage__card-content"
              variants={basicStagger}
              initial="hide"
              animate={inView ? 'show' : 'hide'}
            >
              <motion.h5
                variants={basicStaggerChild}
                className="knockout-bold text-uppercase"
              >{`${index + 1}. ${cardData.cardTitle}`}</motion.h5>
              <motion.div variants={basicStaggerChild}>
                <MDXRenderer>{cardData.cardHeading}</MDXRenderer>
              </motion.div>
              <motion.p variants={basicStaggerChild}>
                {cardData.cardSubheading}
              </motion.p>
              <motion.p variants={basicStaggerChild} className="caslon">
                {cardData.cardLinks.map((link, i) => (
                  <Link to={link.linkUrl} className={`btn-orange${i > 0 ? ' secondary' : ''}`} key={i}>
                    {link.linkText}
                  </Link>
                ))}
              </motion.p>
            </motion.div>
            <div className="home-engage__card-image h-100"></div>
          </div>
        </BackgroundImage>
      </Col>
    </Row>
  )
}

const HomeCard = ({ cardData, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <Row className="my-5" key={index}>
      <Col
        xs={{ size: 12, offset: 0 }}
        md={{ size: 12, offset: index % 2 > 0 ? 1 : 0 }}
        lg={{ size: 11, offset: index % 2 > 0 ? 2 : 0 }}
        className="py-5"
      >
        <div
          className={`${
            index % 2 > 0 ? 'bg-darkgray' : 'bg-gray home-engage__card--left'
          } flex-column-reverse flex-md-row-reverse home-engage__card`}
          ref={ref}
        >
          <motion.div
            className="home-engage__card-content"
            variants={basicStagger}
            initial="hide"
            animate={inView ? 'show' : 'hide'}
          >
            <motion.h5
              variants={basicStaggerChild}
              className="knockout-bold text-uppercase"
            >{`${index + 1}. ${cardData.cardTitle}`}</motion.h5>
            <motion.div variants={basicStaggerChild}>
              <MDXRenderer>{cardData.cardHeading}</MDXRenderer>
            </motion.div>
            <motion.p variants={basicStaggerChild}>
              {cardData.cardSubheading}
            </motion.p>
            <motion.p variants={basicStaggerChild} className="caslon">
              {cardData.cardLinks.map((link, i) => (
                <Link to={link.linkUrl} className={`btn-orange${i > 0 ? ' secondary' : ''}`} key={i}>
                  {link.linkText}
                </Link>
              ))}
            </motion.p>
          </motion.div>
          <motion.div
            className="home-engage__card-image h-100"
            variants={basicStagger}
            initial="hide"
            animate={inView ? 'show' : 'hide'}
          >
            <motion.div variants={basicStaggerChild}>
              <Image className="h-100 w-100" filename={cardData.cardImage} />
            </motion.div>
          </motion.div>
        </div>
      </Col>
    </Row>
  )
}

const HomeEngage = ({ pageData, topics }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="home-engage" ref={ref}>
      <Container fluid="sm">
        <Row className="my-5 pt-5">
          <Col
            className="home-engage__text"
            xs={{ size: 10, offset: 0 }}
            md={{ size: 8, offset: 0 }}
            lg={{ size: 6, offset: 0 }}
            xl={{ size: 4, offset: 0 }}
          >
            <motion.p
              variants={basicStaggerChild}
              initial="hide"
              animate={inView ? 'show' : 'hide'}
            >
              {pageData.frontmatter.engageIntro}
            </motion.p>
          </Col>
        </Row>
        {pageData.frontmatter.engageCards.map((card, index) =>
          card.isLibraryCallout ? (
            <HomeLibraryCard cardData={card} index={index} key={index} topics={topics} />
          ) : index === 1 ? (
            <HomeExplorerCard cardData={card} index={index} key={index} />
          ) : (
            <HomeCard cardData={card} index={index} key={index} />
          )
        )}
      </Container>
    </div>
  )
}

const IndexPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/home/" } }) {
        edges {
          node {
            id
            frontmatter {
              date
              subtitle
              title
              description
              keywords
              heroImage
              heroSubheading
              graphImage
              graphCitation
              graphHeading
              graphSubheading
              engageIntro
              engageCards {
                cardTitle
                cardHeading
                cardSubheading
                cardImage
                isLibraryCallout
                cardLinks {
                  linkText
                  linkUrl
                }
              }
            }
          }
        }
      }
      libraryTopics: allMdx(filter: { fileAbsolutePath: { regex: "/research-library/" } }) {
        edges {
          node {
            frontmatter {
              researchItems {
                label
                displayOnHomePage
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
  const libraryTopics = getPageData.libraryTopics.edges[0].node.frontmatter.researchItems.filter(item => item.displayOnHomePage)

  const pageMeta = getPageMeta('home', pageData, location)
  pageMeta.image = getPageData.metaImage.childImageSharp.original.src

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <HomeHero pageData={pageData} />
      <HomeGraph pageData={pageData} />
      <HomeEngage pageData={pageData} topics={libraryTopics} />
    </Layout>
  )
}

/*
this is a bit of preliminary scaffolding for a fully
animatable graph (instead of the current static image)
*/
// const Graph = () => {
//   return (
//     <div className="home-graph__element">
//       <div className="home-graph__element-y">
//         <div className="home-graph__element-row">
//           <span class="knockout">100%</span>
//           <div></div>
//         </div>
//         <div className="home-graph__element-row">
//           <span class="knockout">90%</span>
//           <div></div>
//         </div>
//         <div className="home-graph__element-row">
//           <span class="knockout">80%</span>
//           <div></div>
//         </div>
//         <div className="home-graph__element-row">
//           <span class="knockout">70%</span>
//           <div></div>
//         </div>
//         <div className="home-graph__element-row">
//           <span class="knockout">60%</span>
//           <div></div>
//         </div>
//         <div className="home-graph__element-row">
//           <span class="knockout">50%</span>
//           <div></div>
//         </div>
//         <div className="home-graph__element-row">
//           <span class="knockout">40%</span>
//           <div></div>
//         </div>
//       </div>
//       <div className="home-graph__element-x">
//         <div className="home-graph__element-col">
//           <div></div>
//           <span class="knockout">1940</span>
//         </div>
//         <div className="home-graph__element-col">
//           <div></div>
//           <span class="knockout">1950</span>
//         </div>
//         <div className="home-graph__element-col">
//           <div></div>
//           <span class="knockout">1960</span>
//         </div>
//         <div className="home-graph__element-col">
//           <div></div>
//           <span class="knockout">1970</span>
//         </div>
//         <div className="home-graph__element-col">
//           <div></div>
//           <span class="knockout">1980</span>
//         </div>
//       </div>
//       <div className="home-graph__element-plot">

//       </div>
//     </div>
//   )
// }

export default IndexPage
