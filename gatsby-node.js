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
        section_title: String @mdx
        section_content: String @mdx
      }

      type ContentRow {
        rowText: String @mdx
      }
  
      type EngageCard {
        cardHeading: String @mdx
      }
    `);
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/research-library/" } }) {
        edges {
          node {
            frontmatter {
              researchItems {
                label
                item_description
                item_color
                item_image
                item_content
                item_content_sections {
                    section_title
                    section_content
                }
                item_references
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
        ...node,
        researchItems: data.allMdx.edges[0].node.frontmatter.researchItems.map(({label, item_image, item_description, item_color}) => ({label, item_image, item_description, item_color}))
      },
    })
  })
}