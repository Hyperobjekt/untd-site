import React, { useCallback, useEffect, useState } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Row, Col, Container } from 'reactstrap'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta, slugify } from './../utils/utils'
import { HubLogo } from '../components/atoms/icons'
import { useInView } from 'react-intersection-observer'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import heroImage1 from '../images/faq-hero1.png'
import heroImage2 from '../images/faq-hero2.png'
import heroImage3 from '../images/faq-hero3.png'
import { basicStagger, basicStaggerChild, basicStaggerChildLeft, basicStaggerChildRight, faqHideShow } from '../components/atoms/animation' 
import { animate, motion, useMotionValue } from 'framer-motion'
import Image from '../components/atoms/image'
import useMeasure from 'react-use-measure'

const FaqHero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  return (
    <div className="bg-gray faq-hero" ref={ref}>
      <Container fluid="sm">
        <Row className="py-5 flex-column-reverse flex-sm-row align-items-center">
          <Col
            sm={{ size: 6, offset: 1 }}
            md={{ size: 6, offset: 1 }}
            lg={{ size: 6, offset: 1 }}
            xl={{ size: 5, offset: 1 }}
          >
            <motion.div
              className="faq-hero__text"
              variants={basicStagger}
              animate={inView ? 'show' : 'hide'}
              initial="hide"
            >
              <h1><span>Frequently</span> <span>Asked</span> <span>Questions</span></h1>
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
              className="faq-hero__image"
            >
              <motion.img
                variants={basicStaggerChildRight}
                src={heroImage1}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChild}
                src={heroImage2}
                alt="hero image"
              />
              <motion.img
                variants={basicStaggerChildLeft}
                src={heroImage3}
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

const CustomImage = props => <Image filename={props.src} />

const FaqQuestion = ({ questionData }) => {
  const [open, setOpen] = useState(false)
  const [boundsRef, bounds] = useMeasure()
  const [hasDetected, setHasDetected] = useState(false)
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
  }, [bounds])

  useEffect(() => {
    if (hasDetected) return

    const t = setTimeout(() => {
      if (
        document.location.hash.length > 1 &&
        document.location.hash.split('#')[1] === slugify(questionData.question)
      ) {
        if (bounds.top !== 0 && !hasDetected) {
          setOpen(true)
          setHasDetected(true)
          scrollToContent()
        }
      } else {
        if (!hasDetected) setHasDetected(true)
      }
    }, 100)

    return () => clearTimeout(t)
  }, [bounds, hasDetected])

  const setHash = hash => {
    window.history.pushState(
      {},
      '',
      window.location.origin + window.location.pathname + hash
    )
  }

  return (
    <div className="faq-question" ref={boundsRef}>
      <button
        className="faq-question__header"
        onClick={e => {
          setOpen(o => !o)
          setHash(`#${slugify(questionData.question)}`)
        }}
      >
        <h2>{questionData.question}</h2>
        <div className={`${open ? 'open' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </button>
      <motion.div
        className="faq-question__answer"
        variants={faqHideShow}
        initial="hide"
        animate={open ? 'show' : 'hide'}
      >
        <div className="faq-question__answer-inner">
          <MDXProvider
            components={{
              img: CustomImage,
            }}
          >
            <MDXRenderer>{questionData.answer}</MDXRenderer>
          </MDXProvider>
        </div>
      </motion.div>
    </div>
  )
}

const FaqQuestions = ({ pageData }) => {
  return (
    <div className="faq-questions">
      <Container fluid="sm">
        <Row>
          <Col
            sm={{ size: 10, offset: 1 }}
            md={{ size: 10, offset: 1 }}
            lg={{ size: 8, offset: 2 }}
            xl={{ size: 8, offset: 2 }}
          >
            {pageData.frontmatter.questions.map((q, i) => (
              <FaqQuestion questionData={q} key={i} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const FaqPage = ({ location }) => {
  const getPageData = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/faq/" } }) {
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
              questions {
                question
                answer
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

  const pageMeta = getPageMeta('faq', pageData, location)
  pageMeta.image = getPageData.metaImage.childImageSharp.original.src

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <FaqHero />
      <FaqQuestions pageData={pageData} />
      {/* <Row className="heading">
        <Col xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }}>
          <h1>{pageData.frontmatter.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {pageData.frontmatter.content_items.map((el, i) => {
            return (
              <div className="item" key={`faq-item-${i}`}>
                <h3>{el.label}</h3>
                <ParseMarkdown>{el.content}</ParseMarkdown>
              </div>
            )
          })}
        </Col>
      </Row> */}
    </Layout>
  )
}

export default FaqPage
