import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Massarg',
  tagline: 'Flexible, powerful, and simple command/argument parser for CLI applications',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://chenasraf.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/massarg/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'chenasraf', // Usually your GitHub org/user name.
  projectName: 'massarg', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: [
          '../src/*.ts',
          // '../src/index.ts',
          // '../src/command.ts',
          // '../src/error.ts',
          // '../src/example.ts',
          // '../src/help.ts',
          // '../src/massarg.ts',
          // '../src/option.ts',
          // '../src/sample.ts',
          // '../src/style.ts',
          // '../src/utils.ts',
        ],
        tsconfig: '../tsconfig.json',

        // typedoc options
        watch: process.env.NODE_ENV === 'development',
        excludePrivate: true,
        excludeProtected: true,
        excludeInternal: true,
        // includeVersion: true,
        categorizeByGroup: false,
        sort: ['visibility'],
        categoryOrder: ['Main', '*'],
        media: 'media',
        plugin: ['typedoc-plugin-zod'],
        entryPointStrategy: 'expand',
        validation: {
          invalidLink: true,
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Massarg',
      logo: {
        alt: 'Massarg Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://npmjs.com/package/massarg',
          label: 'NPM',
          position: 'right',
        },
        {
          href: 'https://github.com/chenasraf/massarg',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'More from @casraf',
          items: [
            {
              label: 'Simple Scaffold - Easy codegen tool',
              href: 'https://chenasraf.github.io/simple-scaffold',
            },
            {
              label: 'Website',
              href: 'https://casraf.dev',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'NPM',
              href: 'https://npmjs.com/package/massarg',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/chenasraf/massarg',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chen Asraf. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
