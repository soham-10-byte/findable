export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  descriptor: string;
  description: string;
  domain: string;
  url: string;
  ogImage: string;
  founder: {
    name: string;
    role: string;
    url: string;
    linkedin: string;
  };
  contact: {
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    serviceAreas: string[];
  };
  socials: {
    linkedin?: string;
    x?: string;
    instagram?: string;
    github?: string;
    youtube?: string;
    gbp?: string;
  };
  nav: {
    label: string;
    href: string;
  }[];
}

const defaultUrl = (import.meta.env.PUBLIC_SITE_URL && !import.meta.env.PUBLIC_SITE_URL.includes('TODO_'))
  ? import.meta.env.PUBLIC_SITE_URL.replace(/\/$/, '')
  : 'https://findableseo.vercel.app';

export const siteConfig: SiteConfig = {
  name: 'Findable',
  legalName: 'Findable Agency',
  tagline: 'Be found. Be cited. Be chosen.',
  descriptor: 'SEO, AEO and GEO for local, D2C and e-commerce brands.',
  description: 'Findable is an SEO, AEO and GEO agency helping local, D2C and e-commerce brands get found on Google and cited by AI tools.',
  domain: defaultUrl,
  url: defaultUrl,
  ogImage: '/og-default.jpg',
  founder: {
    name: 'Ms. Debopriya Mullick',
    role: 'Founder',
    url: `${defaultUrl}/about`,
    linkedin: 'https://www.linkedin.com/in/debopriya-mullick-89395628b',
  },
  contact: {
    email: 'reach2debopriya@gmail.com',
    phone: '+91 9748646868',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    serviceAreas: ['India', 'United States', 'Europe', 'Worldwide'],
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/debopriya-mullick-89395628b',
    x: 'https://x.com/sayhellorai',
    instagram: 'https://www.instagram.com/_rai.o4',
    github: 'https://github.com/soham-10-byte',
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries/local-businesses' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
};
