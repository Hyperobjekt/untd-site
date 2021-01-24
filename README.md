# UNTD SITE

Gatsby repo for UNTD Economic Opportunity Mapping Project

## Develop

```shell
npm run start # Start the development server and the local netlify CMS
gatsby develop # Start the development server
gatsby build # Build the gatsby site (run this locally before pushing to conserve build minutes)
gatsby clean # Cleans your local site cache (try this if something's not updating like you think it should)
```

## Contributing

- Update menu items by editing the menu arrays in `./gatsby-config.js`
- Styles also reside in `./src/theme/`. See `./src/theme/styles.scss` to see what else is loaded into the `layout.js`. Styles are storted by pages and components.
- **All** language strings utilized in pages should be drawn from site config, `.mdx` pages in `./content/pages`, or lang files in `./content/lang`. Fetch langauge strings using GraphQL queries. Every page should be developed from the start to utilize language strings in this way. Do not add language strings directly to pages in `./src/pages`.
- **All** language strings should be editable in the Netlify CMS. When you add a language string to the site, also update the Netlify CMS config to handle that string, and test Netlify CMS to verify that it does so.
- Use zustand to add state values and state value setters in `./src/utils/store.js`.
- a11y:
  - Use buttons and anchor tags (or Gatsby `<Link>` where appropriate) for click targets, not divs or spans.
  - The entire page should be keyboard navigable. No keyboard traps and no missed content.
  - Images that are more than background images should should have `alt` tags
  - Icon buttons (without text inside them) should have an `aria-label`
  - Follow proper heading hierarchy
  - Use semantic tags where appropriate (no `<div>`s for `<p>`s)
  - Use Bootstrap according to accepted conventions (don't nest rows inside rows, don't nest columns inside columns)
  - Use [Lighthouse](https://developers.google.com/web/tools/lighthouse/) or [pa11y](https://pa11y.org/), along with a screen reader, to check for accessibility issues
- Implement Google Analytics custom event tracking using [gatsby-plugin-google-gtag](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/?=gtag):
```javascript
window.gtag("event", "click", { ...data })
```
- Ask questions if you aren't certain or can't find it on a search engine! :)

## Features and Dependencies

- Right now this repo runs on Node 12. Node 10 and below not supported.
