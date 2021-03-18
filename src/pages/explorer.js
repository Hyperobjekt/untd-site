import React from 'react'
import { graphql } from 'gatsby'
import Explorer from 'untd-map'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'
import { useStore } from './../utils/store'
import { getPageMeta } from './../utils/utils'

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
            socialShareImage
          }
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

  // console.log('explorer, ', pageMeta)

  // Set up JSON to pass lang strings to map app.
  const json = JSON.parse(data.allFile.edges[0].node.internal.content)

  // Toggle menu from store.
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  //   <form
  //   name="map_feedback"
  //   data-netlify="true"
  //   netlify-honeypot="bot-field"
  //   hidden
  // >
  //   <input type="text" name="latitude" />
  //   <input type="text" name="longitude" />
  //   <input type="text" name="firstname" />
  //   <input type="text" name="lastname" />
  //   <input type="text" name="address" />
  //   <input type="email" name="email" />
  //   <input type="textarea" name="message" />
  //   <textarea name="message"></textarea>
  // </form>

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
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
        <input type="textarea" name="message" />
        <textarea name="message"></textarea>
      </form>
      <Explorer lang="en_US" langSet={json} toggleMenu={toggleShowMenu} />
    </Layout>
  )
}

export default ExplorerPage
