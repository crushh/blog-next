import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostSimple'

export async function getStaticProps() {
  const post = await getFileBySlug('', 'about')

  return {
    props: post,
  }
}

const AboutPage = (props) => {
  const { mdxSource, toc, frontMatter } = props

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      toc={toc}
      frontMatter={frontMatter}
      mdxSource={mdxSource}
    />
  )
}

export default AboutPage
