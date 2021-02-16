exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    createTypes(`
      type Mdx implements Node {
        frontmatter: MdxFrontmatter
      }
  
      type MdxFrontmatter {
        graphSubheading: String @mdx
        engageCards: [EngageCard]
      }
  
      type EngageCard {
        cardHeading: String @mdx
      }
    `);
};