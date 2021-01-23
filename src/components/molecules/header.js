import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarBrand, Button } from 'reactstrap'
import { MdMenu } from 'react-icons/md'

import { useStore } from './../../utils/store'

const Header = ({ siteTitle, location }) => {
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  return (
    <header>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">LOGO</NavbarBrand>
        <Button color="link" className="btn-menu" onClick={toggleShowMenu}>
          <MdMenu />
        </Button>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  location: PropTypes.object,
}

Header.defaultProps = {
  siteTitle: ``,
  menu: {
    title: `Home`,
    path: `/`,
  },
}

export default Header
