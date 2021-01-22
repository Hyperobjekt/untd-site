import React from 'react'
import { graphql } from 'gatsby'
import Explorer from 'untd-map'

import Layout from '../components/layout'
import SEO from '../components/atoms/seo'

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
        base: { eq: "lang.json" }
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
  console.log('explorer query, ', data)
  const pageMeta = {
    title: 'Explorer',
    type: 'explorer',
    location: location,
    description: null,
    keywords: `TODO`,
    image: null,
    url: `${location.href}`,
  }
  const json = JSON.parse(data.allFile.edges[0].node.internal.content)
  const toggleMenu = () => {
    // TODO: Pass into the explorer the ability to toggle the nav menu.
    // console.log('demo page toggle menu blah')
    return null
  }
  return (
    <Layout location={pageMeta.location} pageType={pageMeta.type}>
      <SEO meta={{ ...pageMeta }} />
      <Explorer lang="en_US" langSet={json} toggleMenu={toggleMenu} />
    </Layout>
  )
}

export default ExplorerPage
