import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const ORG = 'CoEOrg';
const REPO = 'tech-radar-evaluations';
const REPO_URL = `https://github.com/${ORG}/${REPO}`;

const config: Config = {
  title: 'SoftServe Tech Radar',
  tagline: 'Evidence-based technology evaluations from our delivery teams',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: `https://${ORG}.github.io`,
  baseUrl: `/${REPO}/`,
  trailingSlash: false,

  organizationName: ORG,
  projectName: REPO,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: `${REPO_URL}/tree/main/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Tech Radar',
      logo: {
        alt: 'Tech Radar',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Radar', position: 'left'},
        {to: '/docs/intro', label: 'About', position: 'left'},
        {
          href: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
          label: 'Contribute',
          position: 'right',
        },
        {
          href: REPO_URL,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Radar',
          items: [
            {label: 'Home', to: '/'},
            {label: 'About', to: '/docs/intro'},
          ],
        },
        {
          title: 'Contribute',
          items: [
            {
              label: 'Contributing guide',
              href: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
            },
            {
              label: 'Entry template',
              href: `${REPO_URL}/blob/main/radar/entry-template.md`,
            },
          ],
        },
        {
          title: 'Repository',
          items: [{label: 'GitHub', href: REPO_URL}],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SoftServe. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
