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

  // Set up JSON to pass lang strings to map app.
  const json = JSON.parse(data.allFile.edges[0].node.internal.content)

  // Toggle menu from store.
  const toggleShowMenu = useStore(state => state.toggleShowMenu)

  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Explorer lang="en_US" langSet={json} toggleMenu={toggleShowMenu} />
    </Layout>
  )
}

export default ExplorerPage
