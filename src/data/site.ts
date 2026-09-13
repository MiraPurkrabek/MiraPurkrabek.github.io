// Typed site config consumed by shared UI, SEO metadata, and structured data.

export interface SiteConfig {
  /** Public register — wordmark, headings, body prose, and primary metadata. */
  preferredName: string;
  /** Official and academic register — CV, publication bylines, and identity aliases. */
  officialName: string;
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
  institutionalProfile: string;
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
  preferredName: 'Mira Purkrabek',
  officialName: 'Miroslav Purkrabek',
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
    linkedin: 'https://www.linkedin.com/in/purkrabekm/',
    orcid: 'https://orcid.org/0009-0000-6142-6492',
  },
  institutionalProfile:
    'https://fel.cvut.cz/en/faculty/people/29221-miroslav-purkrabek',
  cvPath: '/CV_twopage.pdf',
  siteUrl: 'https://mirapurkrabek.github.io',
  ogImage: '/og/default.png',
  availability: {
    show: true,
    text: 'Open to applied scientist and research engineer roles',
  },
};
