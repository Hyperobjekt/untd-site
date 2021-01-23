import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import clsx from 'clsx'
import { GrClose } from 'react-icons/gr'

import { useStore } from './../../utils/store'

export const SlideoutMenu = ({ menu, location, ...props }) => {
  menu.forEach((item, index) => {
    if (item.path === location.pathname) {
      item.active = true
    } else {
      item.active = false
    }
  })

  const showMenu = useStore(state => state.showMenu)
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  return (
    <div className={clsx('menu-slideout', !!showMenu ? 'show' : '')}>
      <Button
        className="btn-close"
        aria-label="close"
        color="link"
        onClick={toggleShowMenu}
      >
        <GrClose />
      </Button>
      <Nav className="mr-auto" navbar>
        {menu.map((item, index) => (
          <NavItem key={`nav_link_${index}`}>
            <NavLink href={item.path} className={item.active ? `active` : null}>
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  )
}

SlideoutMenu.propTypes = {
  menu: PropTypes.array,
  showMenu: PropTypes.bool,
  setShowMenu: PropTypes.func,
  location: PropTypes.object,
}

export default SlideoutMenu
