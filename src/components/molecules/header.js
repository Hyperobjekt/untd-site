import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Button } from 'reactstrap'

import { useStore } from './../../utils/store'
import { SlideoutMenu } from './SlideoutMenu'

const Header = ({ siteTitle, location, menu }) => {
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  return (
    <header>
      <Navbar color="transparent" light expand="md" fixed="top">
        <Button color="link" className="btn-menu" onClick={toggleShowMenu} aria-label="Menu">
          <div>
            <span></span>
            <span></span>
          </div>
          <span>Menu</span>
        </Button>
        <SlideoutMenu
          location={location}
          menu={menu}
        ></SlideoutMenu>
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
