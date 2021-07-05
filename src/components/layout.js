import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import 'typeface-lato'
import 'typeface-muli'
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css" //this will auto show and hide the link on focus


import Header from './molecules/header'
import Footer from './molecules/footer'


import './../theme/styles.scss'

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SkipNavLink />
      {pageType !== 'explorer' && (
        <Header menu={data.site.siteMetadata.menu} siteTitle={data.site.siteMetadata.title} location={location} />
      )}
      <SkipNavContent />
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
