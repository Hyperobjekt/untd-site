import React, { useCallback, useState } from "react"
import { Link } from "gatsby"
import { HomeIcon, HubLogo, TopicNavArrow } from '../components/atoms/icons'
import { Col, Container, Row } from 'reactstrap'
import Image from '../components/atoms/image'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import { slugify } from '../utils/utils'
import { motion } from 'framer-motion'
import { topicsDropdown } from '../components/atoms/animation'

const TopicHero = ({ pageData }) => {
  
    return (
      <div className="topic-hero" style={{backgroundColor: pageData.item_color}}>
        <Container fluid="sm">
          <Row>
            <Col
              xs={{ size: 12, offset: 0 }}
              sm={{ size: 12, offset: 0 }}
              md={{ size: 12, offset: 0 }}
              lg={{ size: 12, offset: 0 }}
              xl={{ size: 12, offset: 0 }}
            >
                <Link to="/" className="logo">
                  <HubLogo />
                </Link>
                <h1>{pageData.label}</h1>
                <p>{pageData.item_description}</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

const CustomImage = props => <Image filename={props.src} />

const TopicContent = ({ pageData }) => {
    return (
        <div className="topic-content">
            <Container fluid="sm">
                {pageData.item_content_sections && pageData.item_content_sections.map((s, i) => (
                    <Row key={i}>
                        <Col
                            xs={{ size: 12, offset: 0 }}
                            sm={{ size: 12, offset: 0 }}
                            md={{ size: 5, offset: 0 }}
                            lg={{ size: 5, offset: 0 }}
                            xl={{ size: 5, offset: 0 }}
                            className="topic-content__left"
                        >
                            <MDXRenderer>{s.section_title}</MDXRenderer>
                        </Col>
                        <Col
                            xs={{ size: 12, offset: 0 }}
                            sm={{ size: 12, offset: 0 }}
                            md={{ size: 6, offset: 1 }}
                            lg={{ size: 6, offset: 1 }}
                            xl={{ size: 6, offset: 1 }}
                            className="topic-content__right"
                        >
                            <MDXProvider
                                components={{
                                    img: CustomImage,
                                }}
                            >
                                <MDXRenderer>{s.section_content}</MDXRenderer>
                            </MDXProvider>
                        </Col>
                    </Row>
                ))}
                {pageData.item_references && <Row>
                    <Col
                        xs={{ size: 12, offset: 0 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 5, offset: 0 }}
                        lg={{ size: 5, offset: 0 }}
                        xl={{ size: 5, offset: 0 }}
                    ></Col>
                    <Col
                        xs={{ size: 12, offset: 0 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 6, offset: 1 }}
                        lg={{ size: 6, offset: 1 }}
                        xl={{ size: 6, offset: 1 }}
                    >
                        <div className="topic-content__refs">
                            <MDXRenderer>{pageData.item_references}</MDXRenderer>
                        </div>
                    </Col>
                </Row>}
            </Container>
        </div>
    )
}

const TopicNav = ({ pageData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)


    return (
        <div className="topic-nav">
            <Container fluid="sm">
                <Link to="/" className="home-icon">
                    <HomeIcon />
                </Link>
                <div className="arrow-icon">
                    <TopicNavArrow />
                </div>
                <Link to="/research-library/">Research Library</Link>
                <div className="arrow-icon">
                    <TopicNavArrow />
                </div>
                <div className="topic-nav__dropdown">
                    <button
                        className="topic-nav__dropdown-toggle"
                        aria-label="expand dropdown"
                        onClick={() => setDropdownOpen(ddOpen => !ddOpen)}
                    >
                        <h4>{pageData.label}</h4>
                    </button>
                    <motion.div
                        variants={topicsDropdown}
                        initial={dropdownOpen ? 'show' : 'hide'}
                        animate={dropdownOpen ? 'show' : 'hide'}
                        transition={{ duration: 0.7 }}
                        className="topic-nav__dropdown-links"
                    >
                        <div>
                            {pageData.researchItems.map((item, i) => item.label !== pageData.label && (
                                <Link key={i} to={`/research-library/${slugify(item.label)}/`}>{item.label}</Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    )
}

const TopicNext = ({ pageData }) => {
    const nextTopicIndex = pageData.researchItems.findIndex(i => i.label === pageData.label)
    const nextTopic = nextTopicIndex + 1 === pageData.researchItems.length ? pageData.researchItems[0] : pageData.researchItems[nextTopicIndex + 1]
    // console.log(nextTopic)

    return (
        <div className="topic-next">
            <Container fluid="sm">
                <Row>
                    <Col
                        xs={{ size: 12, offset: 0 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 10, offset: 1 }}
                        lg={{ size: 10, offset: 1 }}
                        xl={{ size: 10, offset: 1 }}
                    >
                        <div className="topic-next__card" style={{backgroundColor: nextTopic.item_color}}>
                            <h2>Next topic</h2>
                            <h3>{nextTopic.label}</h3>
                            <p>{nextTopic.item_description}</p>
                            <Link to={`/research-library/${slugify(nextTopic.label)}/`} className="dotted-bottom">Learn more</Link>
                            {nextTopic.item_image && 
                                <div className="topic-next__card-image">
                                    <Image
                                        className="h-100 w-100"
                                        filename={nextTopic.item_image}
                                    />
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function ResearchItemTemplate(props) {

    console.log(props)

    return (
        <Layout location={props.location} pageType="research-topic">
            <TopicHero pageData={props.pageContext} />
            <TopicContent pageData={props.pageContext} />
            <TopicNav pageData={props.pageContext} />
            <TopicNext pageData={props.pageContext} />
        </Layout>
            
    )
}

export default ResearchItemTemplate
