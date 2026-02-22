# vuepress-plugin-copy-page

A VuePress plugin that adds a "Copy Page" button to your documentation pages, allowing users to easily copy page content as Markdown - perfect for use with LLMs like ChatGPT, Claude, etc.

## Features

- Copy page content as Markdown to clipboard
- View page as plain text in a new tab
- Floating button with dropdown menu
- Dark mode support
- Customizable visibility rules
- **Built-in Markdown source extraction** (no additional plugins needed)

## Installation

```bash
npm install vuepress-plugin-copy-page
```

## Usage

Add the plugin to your VuePress config:

```ts
// .vuepress/config.ts
import { copyPagePlugin } from 'vuepress-plugin-copy-page'

export default {
  plugins: [
    copyPagePlugin({
      // Show on pages matching this pattern (default: ['/posts/'])
      includes: ['/posts/', '/docs/'],
      // Or exclude specific pages
      excludes: ['/about/', '/links/'],
      // Button position (default: 'top-right')
      position: 'top-right', // 'top-left' | 'bottom-right' | 'bottom-left'
    }),
  ],
}
```

Import the styles in your client config:

```ts
// .vuepress/client.ts
import 'vuepress-plugin-copy-page/styles'
```

## Options

### includes

- Type: `string[]`
- Default: `['/posts/']`

Page path patterns where the copy button should appear.

### excludes

- Type: `string[]`
- Default: `[]`

Page path patterns where the copy button should NOT appear.

### position

- Type: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`
- Default: `'top-right'`

Position of the copy button on the page.

## How it works

1. During build time, the plugin reads the original Markdown source of each page
2. The Markdown content is injected into the client-side bundle
3. When users click "Copy page", the original Markdown is copied to clipboard
4. If Markdown source is not available, it falls back to copying rendered text content

## License

MIT
