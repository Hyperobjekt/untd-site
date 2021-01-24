require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Site Name`,
    subtitle: `Site Subtitle`,
    description: `SITE DESCRIPTION`,
    keywords: `TODO`,
    siteUrl: `https://TODO.netlify.com`,
    socialShareImage: `TODO.jpg`, // resides in ./src/images
    copyrightDate: `2018`,
    facebookAppID: `TODO`,
    menu: [
      // Items for slideout menu.
      {
        title: `Explorer`,
        path: `/explorer/`,
      },
      {
        title: `Research Library`,
        path: `/research-library/`,
      },
      {
        title: `Use Cases`,
        path: `/use-cases/`,
      },
      {
        title: `FAQ`,
        path: `/faq/`,
      },
      {
        title: `About`,
        path: `/about/`,
      },
      {
        title: `Contact`,
        path: `/contact/`,
      },
    ],
    footerMenu: [
      // Menu items for the footer (if it differs from slideout menu)
      {
        title: `Explorer`,
        path: `/explorer/`,
      },
      {
        title: `Research Library`,
        path: `/research-library/`,
      },
      {
        title: `Use Cases`,
        path: `/use-cases/`,
      },
      {
        title: `FAQ`,
        path: `/faq/`,
      },
      {
        title: `About`,
        path: `/about/`,
      },
      {
        title: `Contact`,
        path: `/contact/`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/src/content/uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `events`,
        path: `${__dirname}/src/content/pages`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `lang`,
        path: `${__dirname}/src/content/lang`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-mdx`,
    'gatsby-plugin-mdx-frontmatter',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `UNTD Site`,
        short_name: `untd-site`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: `${process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID}`,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        async: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/content/**', '/images/**'],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://TODO.com',
        sitemap: 'https://TODO.com/sitemap.xml',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        exclude: [`/images/*`],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            }
          }),
      },
    },
    `gatsby-plugin-netlify-cms`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
