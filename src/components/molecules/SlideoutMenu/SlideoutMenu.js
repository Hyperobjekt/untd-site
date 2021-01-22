import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

export const SlideoutMenu = ({ menu, showMenu, location, ...props }) => {
  menu.forEach((item, index) => {
    if (item.path === location.pathname) {
      item.active = true
    } else {
      item.active = false
    }
  })
  return (
    <div className="menu-slideout">
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

export default SlideoutMenu
