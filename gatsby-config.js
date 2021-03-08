require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `UNTX Social Mobility Hub`,
    subtitle: ``,
    description: `This site is focused on the ways that knowledge about barriers and drivers to upward mobility can be put to action, and how the chances for upward mobility can be increased for all communities.`,
    keywords: `upward mobility, community, change, economic opportunity, socioeconomic mobility`,
    siteUrl: `https://TODO.netlify.com`,
    socialShareImage: `TODO.jpg`, // resides in ./src/images
    copyrightDate: `2018`,
    facebookAppID: `TODO`,
    menu: [
      // Items for slideout menu.
      {
        title: `Home`,
        path: `/`,
      },
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
        path: `/`,
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
        path: `/`,
      },
    ],
    footerMenu: [
      // Menu items for the footer (if it differs from slideout menu)
      {
        title: `Home`,
        path: `/`,
      },
      {
        title: `About`,
        path: `/about/`,
      },
      {
        title: `FAQ`,
        path: `/faq/`,
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
        name: `pages`,
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          `${process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID}`,
          // "GA-TRACKING_ID", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: false,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**'],
        },
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
