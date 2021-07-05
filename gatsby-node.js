const slugify = string =>
  string
    .split(' ')
    .map(ss => ss.toLowerCase())
    .join('-')

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
      type Mdx implements Node {
        frontmatter: MdxFrontmatter
      }
  
      type MdxFrontmatter {
        graphSubheading: String @mdx
        heroText: String @mdx
        contentRows: [ContentRow]
        engageCards: [EngageCard]
        fullWidthText: String @mdx
        researchHeading: String @mdx
        researchSubheading: String @mdx
        libraryHeroText: String @mdx
        libraryDescription: String @mdx
        libraryTopicsHeading: String @mdx
        researchItems: [ResearchItem]
        aboutTheCenterIntro: String @mdx
        aboutTheCenterContent: String @mdx
        questions: [FAQ]
        useCasesRows: [UseCasesRow]
        worksheets: [Worksheet]
      }

      type Worksheet {
        sheetText: String @mdx
      }

      type UseCasesRow {
        rowText: String @mdx
      }

      type FAQ {
        answer: String @mdx
      }

      type ResearchItem {
        item_content: String @mdx
        item_content_sections: [ResearchItemSection]
        item_references: String @mdx
      }

      type ResearchItemSection {
        section_content: String @mdx
      }

      type ContentRow {
        rowText: String @mdx
      }
  
      type EngageCard {
        cardHeading: String @mdx
        cardLinks: [CardLink]
        cardImage: File @fileByRelativePath
        isLibraryCallout: Boolean
      }

      type CardLink {
        linkText: String
        linkUrl: String
      }
    `)
}

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/research-library/" } }) {
        edges {
          node {
            frontmatter {
              researchItems {
                label
              }
            }
          }
        }
      }
    }
  `)
  data.allMdx.edges[0].node.frontmatter.researchItems.forEach(node => {
    actions.createPage({
      path: `/research-library/${slugify(node.label)}/`,
      component: require.resolve(`./src/templates/research-topic.js`),
      context: {
        label: node.label,
      },
    })
  })
}
