import PropTypes from 'prop-types'
import remark from 'remark'
import html from 'remark-html'
import parser from 'html-react-parser'

// Provides a consistent way for us to render content from Markdown frontmatter that propery encodes entities as well
const ParseMarkdown = ({ children }) =>
  parser(
    remark()
      .use(html)
      .processSync(children)
      .toString()
  )

ParseMarkdown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ParseMarkdown
