// Typed site config consumed by shared UI, SEO metadata, and structured data.

export interface SiteConfig {
  /** Casual register — wordmark, headings, and body prose. */
  name: string;
  /** Official register — footer copyright line and schema.org/Person `name`. */
  legalName: string;
  role: string;
  location: {
    home: string;
    current: string;
  };
  /** Footer strapline: role + location in one sentence. */
  tagline: string;
  email: {
    /** Default contact address, used everywhere a single email is shown. */
    primary: string;
    university: string;
  };
  social: {
    github: string;
    googleScholar: string;
    linkedin: string;
    orcid: string;
  };
  cvPath: string;
  siteUrl: string;
  /** Default Open Graph image, relative to the site root. */
  ogImage: string;
  availability: {
    show: boolean;
    text: string;
  };
}

export const site: SiteConfig = {
  name: 'Mira Purkrabek',
  legalName: 'Miroslav Purkrábek',
  role: 'Computer vision researcher and engineer',
  location: {
    home: 'Prague',
    current: 'Amsterdam',
  },
  tagline:
    'Computer vision researcher and engineer.',
  email: {
    primary: 'mira.purkrabek@gmail.com',
    university: 'miroslav.purkrabek@fel.cvut.cz',
  },
  social: {
    github: 'https://github.com/MiraPurkrabek',
    googleScholar: 'https://scholar.google.com/citations?user=EDRJFLcAAAAJ',
    linkedin: 'https://www.linkedin.com/in/miroslav-purkrábek-0051a2243/',
    orcid: 'https://orcid.org/0009-0000-6142-6492',
  },
  cvPath: '/CV_twopage.pdf',
  siteUrl: 'https://mirapurkrabek.github.io',
  ogImage: '/og/default.png',
  availability: {
    show: true,
    text: 'Open to applied scientist and research engineer roles',
  },
};
