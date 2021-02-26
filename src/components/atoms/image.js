import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import BackgroundImage from 'gatsby-background-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

 // Note: You can change "images" to whatever you'd like.

 const imgQuery = graphql`
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
       }
     }
   }
 }
`

 const Image = ({alt, filename, ...props}) => (
   <StaticQuery
     query={imgQuery}
     render={data => {
       const image = data.images.edges.find(n => {
         return filename.includes(n.node.relativePath);
       });
       if (!image) {
         return null;
       }

       //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
       return <Img alt={alt} fluid={image.node.childImageSharp.fluid} {...props} />;
     }}
   />
 );

 export const CustomBackgroundImage = ({alt, filename, children, ...props}) => (
  <StaticQuery
    query={imgQuery}
    render={data => {
      const image = data.images.edges.find(n => {
        return filename.includes(n.node.relativePath);
      });
      if (!image) {
        return null;
      }
      return (
        <BackgroundImage
          Tag="div"
          fluid={image.node.childImageSharp.fluid}
          backgroundColor={`#F0F5F2`}
          {...props}
        >
          {children}
        </BackgroundImage>
      )
    }}
  />
 )


 export default Image;
