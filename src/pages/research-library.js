import React, { useCallback, useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MdKeyboardArrowDown } from 'react-icons/md'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta, slugify } from './../utils/utils'
import Image from '../components/atoms/image'
import { BrushStroke, HubLogo } from '../components/atoms/icons'
import {
  basicStagger,
  basicStaggerChild,
  basicStaggerChildLeft, 
  basicStaggerChildDown, 
  basicStaggerChildRight, 
  basicStaggerChildStatic,
  libraryEntry,
  topicsDropdown,
} from '../components/atoms/animation'

import heroImage1 from '../images/untd-library1.png'
import heroImage2 from '../images/untd-library2.png'
import heroImage3 from '../images/untd-library3.png'
import heroImage4 from '../images/untd-library4.png'
import heroImage5 from '../images/untd-library5.png'
import useMeasure from 'react-use-measure'

const LibraryHero = ({ pageData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="library-hero bg-darkgray" ref={ref}>
      <Container fluid="sm">
        <Row className="align-items-center">
          <Col
            xs={{ size: 8, offset: 2 }}
            sm={{ size: 5, offset: 0 }}
            md={{ size: 5, offset: 0 }}
            lg={{ size: 4, offset: 1 }}
            xl={{ size: 4, offset: 1 }}
          >
            {/* <Image className="w-100" filename={pageData.frontmatter.heroImage} /> */}
            <motion.div
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
              className="library-hero__image"
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
            sm={{ size: 7, offset: 0 }}
            md={{ size: 6, offset: 1 }}
            lg={{ size: 6, offset: 1 }}
            xl={{ size: 6, offset: 1 }}
          >
            <motion.div
              className="library-hero__text"
              variants={basicStaggerChild}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
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
    triggerOnce: true,
  })

  return (
    <div className="library-description" ref={ref}>
      <Container fluid="sm">
        <Row className="align-items-center flex-column-reverse flex-sm-row">
          <Col
            sm={{ size: 6, offset: 0 }}
            md={{ size: 6, offset: 0 }}
            lg={{ size: 6, offset: 0 }}
            xl={{ size: 6, offset: 0 }}
          >
            <motion.div
              className="library-description__text"
              variants={basicStaggerChild}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <MDXRenderer>
                {pageData.frontmatter.libraryDescription}
              </MDXRenderer>
            </motion.div>
          </Col>
          <Col
            xs={{ size: 8, offset: 0 }}
            sm={{ size: 6, offset: 0 }}
            md={{ size: 5, offset: 1 }}
            lg={{ size: 4, offset: 1 }}
            xl={{ size: 4, offset: 1 }}
          >
            <motion.div
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
              className="library-description__image"
            >
              <motion.div variants={basicStaggerChild}>
                <Image
                  className="h-100 w-100"
                  filename={pageData.frontmatter.libraryDescriptionImage}
                />
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const LibraryGrid = ({ pageData }) => {
  return (
    <div className="library-grid">
      <div className="library-grid__eyebrow">
        <h3>Research library topics</h3>
        <BrushStroke />
      </div>
      {pageData.frontmatter.researchItems.map((item, i) => (
        <div
          className="library-grid__entry"
          key={i}
          style={{backgroundColor: item.item_color}}
        >
          <h2>{item.label}</h2>
          <p>Through much of American history, there was an expectation that one's life would provide opportunities that would provide a better quality of life than their parents. At its most simple, the American Dream is represented by these odds of advancement. This dream, however, hasn’t been the norm for at least a generation: many Americans have very low chances of the kind of upward mobility that defined progress for several decades.</p>
          <Link to={`/research-library/${slugify(item.label)}/`} className="dotted-bottom">Learn more</Link>
          {item.item_image && 
          <div className="library-grid__entry-image">
              <Image
                  className="h-100 w-100"
                  filename={item.item_image}
              />
          </div>
          }
          
        </div>
      ))}
    </div>
  )
}

const LibraryTopics = ({ pageData }) => {
  const [boundsRef, bounds] = useMeasure()
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  const [hasDetected, setHasDetected] = useState(false)
  const [activeTopic, setActiveTopic] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(true)

  const bodyScroll = useMotionValue(0)

  const scrollToContent = useCallback(() => {
    animate(bodyScroll, document.body.scrollTop + bounds.top, {
      type: 'tween',
      duration: 1,
      ease: 'easeInOut',
      onUpdate: v => {
        document.body.scrollTo(0, v)
      },
    })
  }, [bounds, bodyScroll])

  useEffect(() => {
    if (window.innerWidth < 576) {
      setDropdownOpen(false)
    }
  }, [])

  useEffect(() => {
    if (hasDetected) return

    const t = setTimeout(() => {
      if (document.location.hash.length > 1) {
        if (bounds.top !== 0 && !hasDetected) {
          setActiveTopic(
            pageData.frontmatter.researchItems.findIndex(
              e => slugify(e.label) === document.location.hash.split('#')[1]
            )
          )
          setHasDetected(true)
          // scrollToContent()
        }
      } else {
        if (!hasDetected) setHasDetected(true)
      }
    }, 100)

    return () => clearTimeout(t)
  }, [bounds, hasDetected])

  const toggleDropdown = useCallback(() => {
    if (!!window && window.innerWidth < 576) {
      setDropdownOpen(ddOpen => !ddOpen)
    }
  }, [])

  const setHash = hash => {
    window.history.pushState(
      {},
      '',
      window.location.origin + window.location.pathname + hash
    )
  }

  return (
    <div className="library-topics" ref={ref}>
      <div className="library-topics__heading bg-gray">
        <Container fluid="sm">
          <Row className="align-items-center">
            <Col
              xs={{ size: 8, offset: 2 }}
              sm={{ size: 4, offset: 0 }}
              md={{ size: 3, offset: 0 }}
              lg={{ size: 3, offset: 0 }}
              xl={{ size: 3, offset: 0 }}
            >
              <motion.div
                variants={basicStagger}
                animate={inView ? 'show' : 'hide'}
                initial="hide"
                className="library-topics__heading-image"
              >
                <motion.div variants={basicStaggerChild}>
                  <Image
                    className="h-100 w-100"
                    filename={pageData.frontmatter.libraryTopicsHeadingImage}
                  />
                </motion.div>
              </motion.div>
            </Col>
            <Col
              sm={{ size: 7, offset: 1 }}
              md={{ size: 8, offset: 1 }}
              lg={{ size: 8, offset: 1 }}
              xl={{ size: 8, offset: 1 }}
            >
              <MDXRenderer>
                {pageData.frontmatter.libraryTopicsHeading}
              </MDXRenderer>
            </Col>
          </Row>
        </Container>
      </div>
      <LibraryGrid pageData={pageData} />
    </div>
  )
}



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
                item_color
                item_content
                item_image
                item_content_sections {
                  section_title
                  section_content
                }
                item_references
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
  // console.log('research-lib pageData', pageData)
  const pageMeta = getPageMeta('research-library', pageData, location)
  pageMeta.image = getPageData.metaImage.childImageSharp.original.src

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <LibraryHero pageData={pageData} />
      <LibraryDescription pageData={pageData} />
      <LibraryTopics pageData={pageData} />
    </Layout>
  )
}

// const LegacyTopicsBody = () => {
//   return (
//     <div className="library-topics__body" ref={boundsRef}>
//         <Container fluid="sm">
//           <Row className="flex-column flex-sm-row">
//             <Col
//               sm={{ size: 5, offset: 0 }}
//               md={{ size: 4, offset: 0 }}
//               lg={{ size: 3, offset: 0 }}
//               xl={{ size: 3, offset: 0 }}
//               className="library-topics__sidebar"
//             >
//               <div>
//                 <h3 className="knockout-bold">Topics</h3>
//                 <button
//                   className="library-topics__sidebar-toggle"
//                   aria-label="expand dropdown"
//                   onClick={toggleDropdown}
//                 >
//                   <h4 className="knockout-bold">
//                     Choose Topic{' '}
//                     <MdKeyboardArrowDown
//                       className={`${dropdownOpen ? 'open' : ''}`}
//                     />
//                   </h4>
//                 </button>
//                 <BrushStroke />
//                 <motion.div
//                   variants={topicsDropdown}
//                   initial={dropdownOpen ? 'show' : 'hide'}
//                   animate={dropdownOpen ? 'show' : 'hide'}
//                   className="library-topics__sidebar-links"
//                 >
//                   <div>
//                     {pageData.frontmatter.researchItems.map((item, i) => (
//                       <button
//                         aria-label={`set topic to ${item.label}`}
//                         onClick={() => {
//                           setActiveTopic(i)
//                           setHash(`#${slugify(item.label)}`)
//                         }}
//                         className={`library-topics__topic ${
//                           i === activeTopic
//                             ? 'library-topics__topic--active'
//                             : ''
//                         }`}
//                         key={i}
//                       >
//                         <div style={{ '--color': item.item_color }}></div>
//                         <span className="caslon">{item.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>
//             </Col>
//             <Col
//               sm={{ size: 7, offset: 0 }}
//               md={{ size: 7, offset: 1 }}
//               lg={{ size: 6, offset: 2 }}
//               xl={{ size: 6, offset: 2 }}
//               className="library-topics__entries"
//             >
//               {pageData.frontmatter.researchItems.map((item, i) => (
//                 <motion.div
//                   className="library-topics__entry"
//                   key={i}
//                   name={slugify(item.label)}
//                   variants={libraryEntry}
//                   style={{
//                     position: i === activeTopic ? 'relative' : 'absolute',
//                   }}
//                   animate={i === activeTopic ? 'show' : 'hide'}
//                 >
//                   <MDXProvider
//                     components={{
//                       img: CustomImage,
//                     }}
//                   >
//                     <MDXRenderer>{item.item_content}</MDXRenderer>
//                     <div className="library-topics__entry-refs">
//                       <MDXRenderer>{item.item_references}</MDXRenderer>
//                     </div>
//                   </MDXProvider>
//                 </motion.div>
//               ))}
//             </Col>
//           </Row>
//         </Container>
//       </div>
//   )
// }

export default SessionsPage
