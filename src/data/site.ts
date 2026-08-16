// Typed site config consumed by Header, Footer, and (from PR-11) SEO/JSON-LD.
// See docs/redesign_15-08-2026_PRs/PR-00-OVERVIEW.md §7 "Naming" for the name/legalName split
// and §8 "Fact sheet" for the source of every value below.

export interface SiteConfig {
  /** Casual register — wordmark, headings, body prose. Always "Mira", never "Miroslav" here. */
  name: string;
  /** Official register — footer copyright line, schema.org/Person `name` (PR-11). */
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
  /** Default Open Graph image, relative to site root. Generated in PR-11. */
  ogImage: string;
  availability: {
    show: boolean;
    text: string;
  };
}

export const site: SiteConfig = {
  name: 'Mira Purkrábek',
  legalName: 'Miroslav Purkrábek',
  role: 'Computer vision researcher and engineer',
  location: {
    home: 'Prague',
    current: 'Amsterdam',
  },
  tagline:
    'Computer vision researcher and engineer. Prague · currently Amsterdam.',
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
  cvPath: '/CV.pdf',
  siteUrl: 'https://mirapurkrabek.github.io',
  ogImage: '/og/default.png',
  availability: {
    show: true,
    text: 'Open to applied scientist and research engineer roles',
  },
};
