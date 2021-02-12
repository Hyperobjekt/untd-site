import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { motion } from 'framer-motion'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { getPageMeta } from './../utils/utils'
import Image from '../components/atoms/image'
// import GatsbyImage from 'gatsby-image'

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
              socialShareImage
              heroImage
              graphImage
              explorerImage
              pathwaysImage
            }
          }
        }
      }
    }
  `)

  const pageData = getPageData.allMdx.edges[0].node

  const pageMeta = getPageMeta('home', pageData, location)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <div className="bg-gray page-type-home-hero">
        <Container fluid="sm">
          <Row className="py-5 align-items-center">
            <Col
              sm={{size: 4, offset: 0}}
              md={{size: 4, offset: 0}}
              lg={{size: 4, offset: 1}}
              xl={{size: 4, offset: 1}}
            >
              <Image className="w-100" filename={pageData.frontmatter.heroImage} />
            </Col>
            <Col 
              className="page-type-home-hero__text" 
              sm={{size: 7, offset: 1}}
              md={{size: 7, offset: 1}}
              lg={{size: 6, offset: 1}}
              xl={{size: 5, offset: 1}}
            >
              <motion.h1 
                className="text-uppercase knockout-bold" 
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: {duration: 0.75, delay: 1.5}}}
              >
                The neighborhoods
              </motion.h1>
              <motion.h2 
                className="text-uppercase knockout"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: {duration: 0.75, delay: 1.7}}}
              >
                you live in have a major impact on
              </motion.h2>
              <motion.h1 
                className="text-uppercase knockout-bold"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: {duration: 0.75, delay: 1.9}}}
              >
                <Link to="/research-library/" className="highlight">social mobility</Link>
                <div className="page-type-home-hero__hint">
                  <Arrow />
                  <span className="knockout text-uppercase text-center">Click on the highlighted words to go to the library</span>
                </div>
              </motion.h1>
              <motion.p
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: {duration: 0.75, delay: 2.1}}}
              >
                This site is focused on the ways that knowledge about barriers and drivers to upward mobility can be put to action, and how the chances for upward mobility can be increased for all communities.
              </motion.p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="page-type-home-graph">
        <Container fluid="sm">
          <Row className="py-5">
            <Col 
              xs={{size: 10, offset: 1}}
              md={{size: 8, offset: 2}}
              lg={{size: 6, offset: 3}}
            >
              <div className="page-type-home-graph__cpal py-4">
                <p className="m-0">
                  <span className="knockout text-uppercase">In partnership with</span>
                </p>
              </div>
            </Col>
          </Row>
          <Row className="my-sm-5 py-sm-5 position-relative">
            <Col 
              className="page-type-home-graph__text" 
              xs={{size: 12, offset: 0}}
              md={{size: 8, offset: 4}}
              lg={{size: 6, offset: 6}}
              xl={{size: 5, offset: 7}}
            >
              <h3 className="knockout-bold text-uppercase">What is socioeconomic mobility?</h3>
              <BrushStroke />
              <p className="caslon"><Link to="/research-library/" className="highlight position-relative">Socioeconomic mobility</Link> is, at its simplest, the movement of people between economic and/or social groups within a society. Prospects for upward socioeconomic mobility, however, are not guaranteed for all Americans - since the 1970s upward mobility across society has been largely stagnant.</p>
              <p className="caslon"><Link to="/research-library/" className="dotted-bottom">Read more</Link><em>or</em><Link to="/faq/" className="dotted-bottom">go to FAQ page</Link></p>
            </Col>
            <Col 
              className="page-type-home-graph__image" 
              xs={{size: 12, offset: 0}}
            >
              <Image className="w-100" filename={pageData.frontmatter.graphImage} />
              <a href="/" target="_black" className="bg-gray d-flex align-items-center mt-5">
                <InfoIcon />
                <span className="caslon ml-2">Source</span>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="page-type-home-engage">
        <Container fluid="sm">
          <Row className="my-5 pt-5">
            <Col 
              className="page-type-home-engage__text" 
              xs={{size: 10, offset: 0}}
              md={{size: 8, offset: 0}}
              lg={{size: 6, offset: 0}}
              xl={{size: 4, offset: 0}}
            >
              <p>There are three main ways to engage with discussions on socioeconomic mobility across the country and here in North Texas.</p>
            </Col>
          </Row>
          <Row className="my-5">
            <Col 
              xs={{size: 12, offset: 0}}
              md={{size: 12, offset: 0}}
              lg={{size: 11, offset: 0}}
              className="py-5"
            >
              <div className="bg-gray flex-column-reverse flex-md-row page-type-home-engage__card page-type-home-engage__card--left">
                <div className="page-type-home-engage__card-content">
                  <h5 className="knockout-bold text-uppercase">1. Research Library</h5>
                  <h4 className="caslon">Curious to learn about what drives <Link to="/research-library/" className="highlight position-relative">socioeconomic mobility?</Link></h4>
                  <p>Jump into our library to get a sense of what you need to know! This is a work in progress, so check back in periodically to see new resources.</p>
                  <p className="caslon"><Link to="/research-library/" className="dotted-bottom">Go to library</Link></p>
                </div>
                <div className="page-type-home-engage__card-topics">
                  <ul>
                    <li className="dotted-bottom">
                      <div className="bg-info"></div>
                      <span className="caslon">Family</span>
                    </li>
                    <li className="dotted-bottom">
                      <div className="bg-info"></div>
                      <span className="caslon">Quality Education</span>
                    </li>
                    <li className="dotted-bottom">
                      <div className="bg-info"></div>
                      <span className="caslon">Income Inequality</span>
                    </li>
                    <li className="dotted-bottom">
                      <div className="bg-info"></div>
                      <span className="caslon">Neighborhood Segregation</span>
                    </li>
                    <li className="dotted-bottom">
                      <div className="bg-info"></div>
                      <span className="caslon">Social Capital</span>
                    </li>
                    <li className="dotted-bottom">
                      <div className="bg-info"></div>
                      <span className="caslon">Projects in North Texas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col 
              xs={{size: 12, offset: 0}}
              md={{size: 12, offset: 1}}
              lg={{size: 11, offset: 2}}
              className="py-5"
            >
              <div className="bg-darkgray flex-column-reverse flex-md-row-reverse page-type-home-engage__card">
                <div className="page-type-home-engage__card-content">
                  <h5 className="knockout-bold text-uppercase">2. Data Explorer</h5>
                  <h4 className="caslon">Want to get a sense for the current conditions of communities across North Texas?</h4>
                  <p>We’ve set up a database of key indicators of socioeconomic mobility to provide insight on areas where different strategies for boosting upward socioeconomic mobility might be most impactful. </p>
                  <p className="caslon"><Link to="/explorer/" className="dotted-bottom">Go to data explorer</Link><Link to="/data/" className="dotted-bottom">Get the data</Link></p>
                </div>
                <div className="page-type-home-engage__card-image h-100">
                  <Image className="h-100 w-100" filename={pageData.frontmatter.explorerImage} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col 
              xs={{size: 12, offset: 0}}
              md={{size: 12, offset: 0}}
              lg={{size: 11, offset: 0}}
              className="py-5"
            >
              <div className="bg-gray flex-column-reverse flex-md-row-reverse page-type-home-engage__card page-type-home-engage__card--left">
                <div className="page-type-home-engage__card-content">
                  <h5 className="knockout-bold text-uppercase">3. Pathways to mobility</h5>
                  <h4 className="caslon">What are some strategies that could help move the needle?</h4>
                  <p>Take a seat as a community leader and see how we can improve the odds for upward mobility by effectively investing in our communities.</p>
                  <p className="caslon"><Link to="/explorer/" className="dotted-bottom">Go to use cases</Link></p>
                </div>
                <div className="page-type-home-engage__card-image h-100">
                  <Image className="h-100 w-100" filename={pageData.frontmatter.pathwaysImage} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Row className="testimonials">
        <Col
          className="col-content"
          xs={{ size: 10, offset: 1 }}
          md={{ size: 5, offset: 1 }}
          lg={{ size: 5, offset: 1 }}
          xl={{ size: 5, offset: 1 }}
        >
          <p>content</p>
        </Col>
      </Row> */}
    </Layout>
  )
}

const Arrow = () => (
  <svg width="45" height="21" viewBox="0 0 45 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.5308 16.7533C30.2579 9.92961 16.2283 6.58283 2.18734 7.15478C1.92433 7.15889 1.39873 6.87888 1.66217 6.58655C3.92082 4.22097 6.7157 2.51238 9.8508 1.56502C10.1643 1.45587 10.8239 1.93615 10.3703 2.16094C9.01518 2.8076 7.66001 3.45427 6.30485 4.10094C5.62726 4.42428 4.94968 4.74761 4.2721 5.07095C3.75692 5.31202 2.29572 5.76412 2.16065 6.28441C2.00846 7.03187 4.33356 8.91803 4.90904 9.52534C5.95939 10.6618 7.04335 11.7763 8.0937 12.9128C8.47923 13.3084 7.77389 13.4819 7.48333 13.1921C6.16476 11.7992 4.84618 10.4063 3.55558 9.01911C2.93543 8.34504 2.27604 7.72064 1.6895 7.02458C1.47722 6.77954 1.08041 6.43926 1.15932 6.05169C1.2326 5.6918 1.47892 5.62663 1.71981 5.44503C2.43685 4.92791 3.46137 4.61756 4.26774 4.23395C6.11012 3.34051 7.98046 2.45276 9.85644 1.53733C10.0184 1.7433 10.214 1.92728 10.376 2.13325C7.27448 3.05863 4.54682 4.72325 2.32178 7.06683C2.15416 6.88855 1.99218 6.68258 1.7966 6.4986C16.0726 5.91683 30.3036 9.27581 42.789 16.2004C43.2587 16.469 43.0061 16.9942 42.5308 16.7533Z" fill="#373E40"/>
  </svg>
)

const BrushStroke = () => (
  <svg width="102" height="10" viewBox="0 0 102 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M102 8.69491C102 8.77119 101.927 8.84746 101.854 8.84746C101.053 8.84746 100.251 8.84746 99.45 8.84746C99.0129 8.84746 98.6486 8.77119 98.7943 8.4661H98.8671C98.6486 8.54237 98.3571 8.38983 98.2843 8.61864C98.43 8.61864 98.7214 8.61864 98.5757 8.69491C98.43 8.84746 98.1386 9 97.7743 8.77119V8.69491C97.7014 8.61864 97.7014 8.54237 97.5557 8.61864C97.4829 8.61864 97.6286 8.69491 97.6286 8.77119C97.7014 8.92373 97.5557 8.92373 97.3371 8.92373C96.9 8.84746 97.2643 8.69492 97.2643 8.54237C97.0457 8.69492 96.6814 8.31356 96.4629 8.61864H96.39C96.39 8.61864 96.39 8.69491 96.4629 8.69491C96.39 8.77119 96.39 8.77119 96.3171 8.84746C96.3171 8.84746 96.2443 8.84746 96.2443 8.92373C95.2243 9.07627 94.35 8.77119 93.4757 8.54237C93.1843 8.4661 93.1843 8.54237 93.0386 8.61864C92.6014 8.92373 92.1643 9.22881 91.4357 8.77119C91.2171 8.69491 90.9257 8.69492 90.7071 8.84746C90.4157 8.69492 90.1243 8.61864 89.8329 8.4661C89.76 8.4661 89.76 8.38983 89.6871 8.38983L89.6143 8.4661C89.4686 8.4661 89.3229 8.38983 89.1043 8.38983C89.1771 7.77966 88.3029 8.08475 88.0843 8.16102C87.5743 8.31356 87.5743 8.16102 87.4286 8.00847C86.8457 8.23729 87.5743 8.31356 87.6471 8.38983C86.3357 8.54237 85.0243 8.69492 83.64 8.84746C82.9843 8.92373 82.3286 8.77119 81.8186 8.61864C81.6729 8.38983 81.1629 8.61864 80.9443 8.4661C80.8714 8.4661 80.7986 8.4661 80.7257 8.4661C80.58 8.61864 80.58 9.07627 80.07 8.54237C79.8514 8.31356 79.56 8.4661 79.3414 8.54237C78.1757 9.07627 77.3014 8.54237 76.4271 8.31356C76.4271 8.4661 76.2086 8.54237 76.0629 8.4661C75.48 8.08475 74.8243 8.38983 74.2414 8.38983C74.1686 8.38983 74.0957 8.31356 74.0957 8.31356C73.95 8.31356 73.8771 8.31356 73.7314 8.31356C73.5857 8.31356 73.3671 8.31356 73.2214 8.31356C73.1486 8.38983 73.2943 8.4661 73.3671 8.4661C73.1486 8.54237 72.8571 8.77119 72.6386 8.4661C72.5657 8.54237 72.42 8.54237 72.3471 8.61864C71.4729 8.61864 70.7443 8.23729 69.87 8.31356C69.7971 8.31356 69.7243 8.31356 69.6514 8.31356C69.5057 8.31356 69.2871 7.9322 69.1414 8.38983C69.0686 8.77119 68.4857 8.77119 67.9757 8.61864C67.4657 8.61864 66.5914 9 66.4457 8.38983C66.0814 8.38983 65.7171 8.4661 65.3529 8.4661C65.2071 8.38983 64.9886 8.31356 64.8429 8.23729C64.6243 8.38983 64.4786 8.54237 64.26 8.69491C63.3857 8.69491 62.73 8.4661 62.0743 8.23729C61.8557 8.16102 61.71 8.08475 61.4914 8.08475C61.4186 8.08475 61.3457 8.08475 61.2729 8.08475C60.7629 8.31356 60.18 7.85593 59.67 8.16102C59.67 8.23729 59.5971 8.31356 59.8157 8.31356C59.2329 8.69491 58.65 8.77119 58.2857 8.16102C58.2129 8.23729 58.0671 8.31356 58.0671 8.31356C56.9014 7.85593 56.1729 8.69491 55.1529 8.61864C54.8614 8.61864 54.57 8.69492 54.57 8.4661C52.7486 8.84746 50.9271 8.69492 49.1786 8.4661C48.8143 8.38983 49.1057 8.23729 48.96 8.08475H48.8871C48.8143 8.08475 48.8143 8.08475 48.7414 8.08475C48.6686 8.08475 48.6686 8.08475 48.5957 8.08475C48.5229 8.08475 48.45 8.08475 48.3771 8.08475C47.94 8.00847 48.1586 8.16102 48.2314 8.23729C46.9929 8.61864 45.7543 8.23729 44.4429 8.31356C44.37 8.31356 44.2971 8.31356 44.2243 8.31356C43.9329 8.4661 43.6414 8.54237 43.4229 8.31356C43.4229 8.23729 43.35 8.16102 43.35 8.08475C42.84 8.08475 43.1314 8.23729 43.2771 8.31356C42.5486 8.16102 41.82 8.38983 41.0914 8.31356C40.9457 8.31356 40.7271 8.23729 40.6543 8.38983C40.2171 8.4661 39.78 8.38983 39.4157 8.31356C37.8857 8.4661 36.3557 8.54237 34.8257 8.38983C32.13 8.38983 29.5071 8.4661 26.7386 8.31356C24.9171 8.23729 23.0229 8.38983 21.1286 8.38983C18.9429 8.38983 16.6843 8.23729 14.5714 8.31356C12.5314 8.38983 10.4186 8.38983 8.37857 8.4661C6.19286 8.4661 3.93429 8.38983 1.74857 8.38983C1.23857 8.38983 1.31143 8.16102 1.23857 8.00847C0.801429 6.86441 0.874286 5.5678 0.728571 4.27119C0.655714 3.88983 0.582857 3.50847 0 3.27966C0.801429 3.20339 1.53 3.05085 0.801429 2.51695C0.655714 2.36441 0.582857 2.28814 0.874286 2.21186C1.31143 2.28814 1.45714 2.13559 1.23857 1.98305C0.728571 1.75424 1.23857 1.52542 1.23857 1.37288C1.31143 0.381356 2.40429 0.228814 3.93429 0.305085C8.01429 0.533898 12.0214 0 16.1014 0C21.1286 0.0762712 26.1557 0.0762712 31.1829 0.0762712C34.8986 0.0762712 38.6143 0.0762712 42.33 0.228814C45.9729 0.381356 49.5429 0.381356 53.1857 0.228814C58.14 0.0762712 63.0943 0.228814 68.0486 0.228814C70.0886 0.228814 72.2014 0.305085 74.2414 0.305085C77.52 0.305085 80.7986 0.457627 84.0771 0.305085C85.9714 0.228814 88.0114 0.228814 89.9057 0.228814C92.3829 0.152542 94.9329 0.533898 97.41 0.152542C97.92 0.0762712 98.5029 0.228814 98.7214 0.533898C99.3771 1.37288 99.7414 2.28814 99.5229 3.12712C99.3043 3.88983 99.8143 4.5 99.7414 5.18644C99.7414 5.72034 100.834 5.72034 101.126 6.10169C101.854 6.86441 101.709 7.77966 102 8.69491ZM39.6343 8.31356C39.5614 8.31356 39.5614 8.31356 39.4886 8.31356C39.5614 8.38983 39.5614 8.38983 39.6343 8.31356ZM64.8429 8.31356C64.6243 8.31356 64.4057 8.31356 64.1871 8.31356C64.1871 8.31356 64.1871 8.38983 64.1143 8.38983C64.3329 8.38983 64.5514 8.31356 64.8429 8.31356ZM68.4857 8.4661C68.34 8.4661 68.1214 8.38983 67.9757 8.38983C67.9029 8.4661 67.83 8.61864 68.0486 8.69491C68.2671 8.69491 68.4857 8.61864 68.4857 8.4661ZM73.0757 8.31356C73.0029 8.23729 72.93 8.16102 72.93 8.08475C72.93 8.08475 72.8571 8.08475 72.7843 8.08475C72.8571 8.23729 73.0029 8.31356 73.0757 8.31356ZM82.11 8.38983C82.11 8.38983 82.0371 8.38983 82.0371 8.31356C81.9643 8.31356 81.9643 8.38983 81.8914 8.38983C81.9643 8.38983 82.0371 8.38983 82.11 8.38983ZM87.3557 8.00847C87.2829 8.00847 87.2829 8.00847 87.21 8.00847C87.21 8.00847 87.2829 8.00847 87.3557 8.00847ZM92.6014 8.61864C92.6743 8.61864 92.6743 8.61864 92.7471 8.61864C92.7471 8.61864 92.7471 8.61864 92.6014 8.61864C92.6743 8.61864 92.6743 8.54237 92.6014 8.61864Z" fill="#2A3133"/>
  </svg>
)

const InfoIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.632 16.696C14.632 17.176 14.632 17.672 14.616 18.152C14.6 18.408 14.536 18.472 14.36 18.472H13.576C13.464 18.472 13.416 18.504 13.416 18.6V18.92C13.416 19.016 13.464 19.048 13.544 19.048C13.72 19.048 14.344 19 15.272 19C15.944 19 16.68 19.048 16.808 19.048C16.92 19.048 16.952 19 16.952 18.888V18.616C16.952 18.52 16.92 18.472 16.792 18.472H16.056C15.88 18.472 15.832 18.36 15.8 18.056C15.784 17.88 15.784 17.304 15.784 16.68V14.936C15.784 13.608 15.784 12.6 15.816 12.328C15.832 12.216 15.816 12.136 15.736 12.136C15.64 12.136 15.56 12.168 15.432 12.232C14.824 12.568 14.216 12.824 13.704 13.016C13.624 13.048 13.592 13.08 13.592 13.128V13.272C13.592 13.336 13.624 13.368 13.736 13.384C14.536 13.512 14.632 13.8 14.632 14.344V16.696ZM14.792 10.328C15.464 10.328 15.752 9.816 15.752 9.384C15.752 9.016 15.48 8.536 14.888 8.536C14.232 8.536 13.88 9.016 13.88 9.432C13.88 9.96 14.424 10.328 14.792 10.328Z" fill="#303030"/>
    <circle cx="14.6969" cy="14.6969" r="11.75" transform="rotate(15 14.6969 14.6969)" stroke="#303030" strokeWidth="0.5"/>
  </svg>
)



export default IndexPage
