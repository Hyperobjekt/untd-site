import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const ContactForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const honeypotRef = useRef(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmittedError, setIsSubmittedError] = useState(false)
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
      signup: false
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      subject: Yup.string().required('Required'),
      message: Yup.string().required('Required'),
      signup: Yup.boolean()
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

      // detect spam with honeypot
      if(honeypotRef.current.value !== "") return
      
      // Use Netlify forms processing.
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...values }),
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

      const {email, signup} = values 

      if(signup) {
        fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email})
      })
        .then(res => res.text())
        .then(text => {
          console.log('Signup success!', text)
        })
        .catch(error => {
          // Catch submission errors.
          console.log('Signup error:', error)
          setIsSubmittedError(true)
        })
      }

      // e.preventDefault();
    },
  })
  return (
    <form
      name="contact"
      method="POST"
      onSubmit={formik.handleSubmit}
      className={formik.isSubmitting ? 'submitting' : 'not-submitting'}
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you're human: <input name="bot-field" ref={honeypotRef} />
        </label>
      </p>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className={`form-control ${
            formik.touched.firstName && formik.errors.firstName
              ? 'is-invalid'
              : ''
          } ${
            formik.touched.firstName && !formik.errors.firstName
              ? 'is-valid'
              : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="invalid-feedback">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className={`form-control ${
            formik.touched.lastName && formik.errors.lastName
              ? 'is-invalid'
              : ''
          } ${
            formik.touched.lastName && !formik.errors.lastName ? 'is-valid' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="invalid-feedback">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${
            formik.touched.email && formik.errors.email ? 'is-invalid' : ''
          } ${formik.touched.email && !formik.errors.email ? 'is-valid' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={`form-control ${
            formik.touched.subject && formik.errors.subject ? 'is-invalid' : ''
          } ${
            formik.touched.subject && !formik.errors.subject ? 'is-valid' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
        />
        {formik.touched.subject && formik.errors.subject ? (
          <div>{formik.errors.subject}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          type="text"
          className={`form-control ${
            formik.touched.message && formik.errors.message ? 'is-invalid' : ''
          } ${
            formik.touched.message && !formik.errors.message ? 'is-valid' : ''
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
        />
        {formik.touched.message && formik.errors.message ? (
          <div>{formik.errors.message}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="signup">Subscribe to email updates</label>
        <input
          id="signup"
          name="signup"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.signup}
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className={`btn btn-primary ${formik.isSubmitting ? 'is-submitting' : ''}`}
          disabled={formik.isSubmitting ? 'disabled' : false}
        >
          Submit
        </button>
        {formik.isSubmitting ? (
          <div className="spinner-border spinner-border-sm ml-2" role="status">
            <span className="sr-only">Submitting...</span>
          </div>
        ) : null}
        {isSubmitted && !isSubmittedError ? (
          <div className="alert alert-success" role="alert">
            Messsage received! Thanks for contacting us.
          </div>
        ) : null}
        {isSubmittedError ? (
          <div className="alert alert-danger" role="alert">
            Sorry, something went wrong with the form submission. If you like
            you can still <a href="mailto:TODO.com">contact us by email.</a>
          </div>
        ) : null}
      </div>
    </form>
  )
}

export default ContactForm
