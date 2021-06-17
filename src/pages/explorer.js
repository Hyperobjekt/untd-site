import React from 'react'
import { graphql } from 'gatsby'
import Explorer from '@hyperobjekt/untd-map'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { useStore } from './../utils/store'
import { getPageMeta } from './../utils/utils'
import '../theme/pages/explorer.scss'

export const query = graphql`
  query {
    allMdx(filter: { fileAbsolutePath: { regex: "/explorer/" } }) {
      edges {
        node {
          id
          frontmatter {
            date
            subtitle
            title
            description
            keywords
          }
        }
      }
    }
    metaImage: file(relativePath: { eq: "map-share.png" }) {
      id
      childImageSharp {
        original {
          src
        }
      }
    }
    allFile(
      filter: {
        extension: { eq: "json" }
        dir: { regex: "/lang/g" }
        base: { eq: "explorer.json" }
      }
    ) {
      edges {
        node {
          internal {
            content
          }
        }
      }
    }
  }
`

const ExplorerPage = ({ data, location }) => {
  const pageData = data.allMdx.edges[0].node

  const pageMeta = getPageMeta('explorer', pageData, location)
  pageMeta.image = data.metaImage.childImageSharp.original.src

  // Toggle menu from store.
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      {/* This form is an unused placeholder to trigger the netlify API to listen for submissions
      from the explorer. */}
      <form
        name="map_feedback"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="latitude" />
        <input type="text" name="longitude" />
        <input type="text" name="firstname" />
        <input type="text" name="lastname" />
        <input type="text" name="address" />
        <input type="email" name="email" />
        <textarea id="message" name="message" type="text" rows="4" />
      </form>
      {/* End hidden form. */}
      <Explorer lang="en_US" toggleMenu={toggleShowMenu} />
    </Layout>
  )
}

export default ExplorerPage
