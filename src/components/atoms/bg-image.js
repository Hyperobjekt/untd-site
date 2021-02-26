import React from "react"
import { StaticQuery, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

export const CustomBackgroundImage = ({alt, filename, children, ...props}) => (
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
                    }
                    }
                }
            }
        `}
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