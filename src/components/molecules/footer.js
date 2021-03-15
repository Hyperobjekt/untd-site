import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Container } from 'reactstrap'
import PropTypes from 'prop-types'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { HubLogo } from '../atoms/icons'
import { libraryEntry } from '../atoms/animation'
import { motion } from 'framer-motion'

const FooterForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmittedError, setIsSubmittedError] = useState(false)
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // console.log('onSubmit()', values)
      // For testing form funct locally.
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2));
      //   formik.setSubmitting(false);
      //   // If submission succeeds.
      //   setIsSubmitted(true);
      //   // If submission fails.
      //   // setIsSubmittedError(true);
      // }, 1400);
      console.log("formik submit:", values)

      // Post to the netlify lambda.
      // https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8
      fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(values),
      })
        .then(() => {
          console.log('Form submission success!')
          // Turn off submitting state.
          formik.setSubmitting(false)
          // Enable display of submission success message.
          setIsSubmitted(true)
          // Clear form fields
          formik.resetForm()
        })
        .catch(error => {
          // Catch submission errors.
          console.log('Submission error:', error)
          // Turn off submitting state.
          formik.setSubmitting(false)
          // Enable display of submission error message.
          setIsSubmittedError(true)
        })
    },
  })

  return (
    <div className="footer__form">
      <motion.div variants={libraryEntry} animate={isSubmitted ? 'hide' : 'show'}>
        <form
          name="subscribe"
          method="POST"
          onSubmit={formik.handleSubmit}
          className={`${formik.isSubmitting ? 'submitting' : 'not-submitting'} ${
            formik.touched.email && formik.errors.email ? 'is-invalid' : ''
          } ${formik.touched.email && !formik.errors.email ? 'is-valid' : ''}`}
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <button type="submit" aria-label="submit email" disabled={formik.isSubmitting ? 'disabled' : false}>
            <MdKeyboardArrowRight />
          </button>
        </form>
      </motion.div>
      <motion.div className="footer__success" variants={libraryEntry} animate={isSubmitted && !isSubmittedError ? 'show' : 'hide'}>
        <p>Thank you.</p>
      </motion.div>
      <motion.div className="footer__error" variants={libraryEntry} animate={isSubmittedError ? 'show' : 'hide'}>
        <p>Error.</p>
      </motion.div>
    </div>
  )
}

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
            <FooterForm />
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
