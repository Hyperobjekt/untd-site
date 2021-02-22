import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarBrand, Button } from 'reactstrap'

import { useStore } from './../../utils/store'

const Header = ({ siteTitle, location }) => {
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  return (
    <header>
      <Navbar color="transparent" light expand="md" fixed="top">
        <Button color="link" className="btn-menu" onClick={toggleShowMenu}>
          <div>
            <span></span>
            <span></span>
          </div>
          <span>Menu</span>
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
