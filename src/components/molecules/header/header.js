import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

import './header.scss'

const Header = ({ siteTitle, location }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [fullLogo, setFullLogo] = useState(true)
  const headerHeight = 89
  const maxWidth = 768

  const [isToggleMenu, setToggleMenu] = useState(false)

  const logoSizeHandler = () => {
    if (window.pageYOffset > headerHeight || window.innerWidth < maxWidth) {
      // console.log('scrolled beyond header height')
      setFullLogo(false)
    } else {
      setFullLogo(true)
    }
    // console.log('fullLogo', fullLogo)
    if (window.innerWidth < maxWidth) {
      setToggleMenu(true)
    } else {
      setToggleMenu(false)
    }
  }

  useEffect(() => {
    ;['scroll', 'resize', 'load'].forEach(function(e) {
      window.addEventListener(e, logoSizeHandler)
    })
    logoSizeHandler()
  })

  return (
    <header
      className={
        (!!fullLogo ? 'full-logo' : '') +
        ' ' +
        (!!isToggleMenu ? 'toggle-menu' : '')
      }
    >
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">LOGO</NavbarBrand>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  menu: PropTypes.array,
}

Header.defaultProps = {
  siteTitle: ``,
  menu: {
    title: `Home`,
    path: `/`,
  },
}

export default Header
