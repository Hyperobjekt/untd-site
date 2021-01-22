import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import 'typeface-lato'
import 'typeface-muli'

import Header from './molecules/header/header'
import Footer from './molecules/footer/footer'
import SlideoutMenu from './molecules/SlideoutMenu/SlideoutMenu'
import './../theme/styles.scss'
import './layout.scss'

const Layout = ({ location, pageType, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          copyrightDate
          menu {
            path
            title
          }
        }
      }
    }
  `)

  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {pageType !== 'explorer' && (
        <Header
          siteTitle={data.site.siteMetadata.title}
          location={location}
          setShowMenu={setShowMenu}
        />
      )}
      <SlideoutMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        location={location}
        menu={data.site.siteMetadata.menu}
      ></SlideoutMenu>
      <main className={`page-type-${pageType ? pageType : 'null'}`}>
        {children}
      </main>
      {pageType !== 'explorer' && <Footer data={data} />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
