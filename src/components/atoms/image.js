import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 *
 * NOTE / TODO: June 17, 2021:
 * - this component is querying and processing all files, instead it should only query the required file
 */

const Image = ({ filename, ...props }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 800, quality: 70) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return filename.includes(n.node.relativePath)
      })
      if (!image || !image.node) return null
      // if it's an SVG, use the publicURL
      if (image.node.relativePath.includes('.svg'))
        return <img src={image.node.publicURL} {...props} />
      if (image.node.childImageSharp)
        return <Img fluid={image.node.childImageSharp.fluid} {...props} />
      return null
    }}
  />
)

export default Image
