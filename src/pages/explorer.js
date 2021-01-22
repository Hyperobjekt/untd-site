import React from 'react'
import { graphql } from 'gatsby'

// allMdx {
//   edges {
//     node {
//       frontmatter {
//         title
//         path
//         date(formatString: "MMMM DD, YYYY")
//       }
//     }
//   }
// }
//
//   query($pathSlug: String!)

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

const ExplorerPage = ({ data, ...props }) => {
  console.log('explorer query, ', data)
  const json = JSON.parse(data.allFile.edges[0].node.internal.content)
  return <p>Explorer page</p>
}

export default ExplorerPage
