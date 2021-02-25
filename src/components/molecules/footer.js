import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import PropTypes from 'prop-types'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { HubLogo } from '../atoms/icons'

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            footerMenu {
              path
              title
            }
          }
        }
      }
    `
  )

  return (
    <footer className="footer bg-darkgray">
      <Container fluid="md" className="px-4 px-md-3">
        <Row className="justify-content-between pb-5 mb-5 flex-column flex-md-row align-items-center align-items-md-start">
          <Col md={{ size: 5 }} className="pb-5 pb-md-0">
            <h2 className="knockout-bold text-uppercase">
              Subscribe to our e-mail updates
            </h2>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="input email"
              ></input>
              <button type="submit" aria-label="submit email">
                <MdKeyboardArrowRight />
              </button>
            </form>
          </Col>
          <HubLogo className="mx-5 mx-md-4" />
        </Row>
        <div className="footer__links">
          {site.siteMetadata.footerMenu.map((el, i) => {
            return (
              <Link to={el.path} key={i} className="text-uppercase knockout">
                {el.title}
              </Link>
            )
          })}
        </div>
        <p>
          Map made possible by Mapbox <span>|</span> Site by Hyperobjekt
        </p>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  data: PropTypes.object,
}

Footer.defaultProps = {
  data: {},
}

export default Footer
