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
      }

      type ResearchItem {
        item_content: String @mdx
        item_references: String @mdx
      }

      type ContentRow {
        rowText: String @mdx
      }
  
      type EngageCard {
        cardHeading: String @mdx
      }
    `);
};