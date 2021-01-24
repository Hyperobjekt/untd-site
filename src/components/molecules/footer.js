import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { FiFacebook, FiMail } from 'react-icons/fi'
import smoothscroll from 'smoothscroll-polyfill'

import { useStore } from './../../utils/store'

const Footer = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(true)

  const headerHeight = useStore(state => state.headerHeight)

  const scrollToTop = () => {
    // console.log('scrollToTop');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const logoSizeHandler = () => {
    if (window.pageYOffset > headerHeight) {
      // console.log('scrolled beyond header height')
      setIsScrolled(false)
    } else {
      setIsScrolled(true)
    }
  }

  useEffect(() => {
    // Kick off the polyfill!
    smoothscroll.polyfill()
    // Listen for window events to manage footer state.
    ;['scroll', 'resize', 'load'].forEach(function(e) {
      window.addEventListener(e, logoSizeHandler)
    })
    logoSizeHandler()
  })

  return (
    <footer
      className={`container-fluid pt-10 scroll-status-${
        isScrolled === true ? 'top' : 'scrolled'
      }`}
    >
      <div className="row">
        <div className="col col-icons col-10 offset-1 order-sm-2 col-lg-6 offset-lg-0">
          <a href="mailto:TODO" alt="Email us">
            <FiMail />
          </a>
          <a href="https://www.facebook.com/TODO" alt="Follow TODO">
            <FiFacebook />
          </a>
        </div>
        <div className="col col-legal col-sm-10 offset-1 order-sm-3 col-lg-5 offset-lg-1 order-lg-1">
          <p>Footer content</p>
        </div>
        <div
          role="button"
          tabIndex={0}
          className="up-button"
          onClick={scrollToTop}
          onKeyPress={scrollToTop}
        >
          <MdKeyboardArrowUp />
          <span>SCROLL TO TOP</span>
        </div>
      </div>
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
