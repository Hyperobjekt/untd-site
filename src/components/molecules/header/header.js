import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarBrand, Button } from 'reactstrap'
import { MdMenu } from 'react-icons/md'

import './header.scss'

const Header = ({ siteTitle, location }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">LOGO</NavbarBrand>
        <Button color="link" className="align-self-end">
          <MdMenu />
        </Button>
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
