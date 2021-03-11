export const getPageMeta = (type, pageData, location) => {
  return {
    title: pageData.frontmatter.title ? pageData.frontmatter.title : null,
    type: type,
    location: location,
    description: pageData.frontmatter.description
      ? pageData.frontmatter.description
      : null,
    keywords: pageData.frontmatter.keywords
      ? pageData.frontmatter.keywords.toString()
      : null,
    image: pageData.frontmatter.socialShareImage
      ? pageData.frontmatter.socialShareImage
      : null,
    url: `${location.href}`,
  }
}

export const slugify = string =>
  string
    .split(' ')
    .map(ss => ss.toLowerCase())
    .join('-')