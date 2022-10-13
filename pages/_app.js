import Link from 'next/link'
import { PrismicLink, PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'

import { repositoryName, linkResolver } from '../prismicio'

import '../styles/globals.scss'

const NextLinkShim = ({ href, children, locale, ...props }) => {
  return (
    <Link href={href} locale={locale}>
      <a {...props}>{children}</a>
    </Link>
  )
}

const richTextComponents = {
  heading1: ({ children }) => (
    <h1>
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2>
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3>
      {children}
    </h3>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
  oList: ({ children }) => (
    <ol>{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li>{children}</li>
  ),
  list: ({ children }) => (
    <ul>{children}</ul>
  ),
  listItem: ({ children }) => (
    <li>{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre>
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong>{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicLink
      field={node.data}
    >
      {children}
    </PrismicLink>
  ),
}

export default function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={NextLinkShim}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  )
}
