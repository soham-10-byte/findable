import { siteConfig } from '../config/site';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceSchemaOptions {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  audienceType?: string;
}

export interface BlogPostSchemaOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  faqs?: FaqItem[];
}

export interface PageSchemaOptions {
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  title: string;
  description: string;
  url: string;
  breadcrumbs?: BreadcrumbItem[];
  service?: ServiceSchemaOptions;
  faqs?: FaqItem[];
  blogPost?: BlogPostSchemaOptions;
}

export function buildPageSchema(options: PageSchemaOptions) {
  const baseDomain = siteConfig.url.replace(/\/+$/, '');
  const orgId = `${baseDomain}/#organization`;
  const websiteId = `${baseDomain}/#website`;
  const founderId = `${baseDomain}/#founder`;
  const rawUrl = (options.url && !options.url.includes('TODO_DOMAIN')) ? options.url : siteConfig.url;
  const cleanUrl = rawUrl.replace(/\/+$/, '');
  const webpageId = `${cleanUrl}/#webpage`;

  // Filter valid sameAs (exclude TODO markers)
  const sameAsList = Object.values(siteConfig.socials).filter(
    (url) => url && !url.includes('TODO_')
  );

  const graph: any[] = [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': orgId,
      name: siteConfig.name,
      alternateName: `${siteConfig.name} Agency`,
      url: `${baseDomain}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${baseDomain}/logo-512.png`,
        width: 512,
        height: 512,
      },
      image: `${baseDomain}${siteConfig.ogImage}`,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      founder: { '@id': founderId },
      areaServed: siteConfig.contact.serviceAreas,
      knowsAbout: [
        'Search engine optimization',
        'Answer engine optimization',
        'Generative engine optimization',
        'Local SEO',
        'E-commerce SEO',
        'SEO-friendly web development',
      ],
      ...(sameAsList.length > 0 ? { sameAs: sameAsList } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${baseDomain}/`,
      name: siteConfig.name,
      description: siteConfig.descriptor,
      publisher: { '@id': orgId },
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': founderId,
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
      url: siteConfig.founder.url,
      worksFor: { '@id': orgId },
      ...(siteConfig.founder.linkedin && !siteConfig.founder.linkedin.includes('TODO_')
        ? { sameAs: [siteConfig.founder.linkedin] }
        : {}),
    },
  ];

  // Primary WebPage
  const pageType = options.type || 'WebPage';
  const webpageEntity: any = {
    '@type': pageType,
    '@id': webpageId,
    url: rawUrl,
    name: options.title,
    description: options.description,
    isPartOf: { '@id': websiteId },
    inLanguage: 'en',
  };
  graph.push(webpageEntity);

  // Breadcrumbs
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    const validCrumbs = options.breadcrumbs.filter(
      (crumb) => typeof crumb.url === 'string' && crumb.url.trim() !== ''
    );

    if (validCrumbs.length > 0) {
      const breadcrumbListEntity = {
        '@type': 'BreadcrumbList',
        '@id': `${options.url}#breadcrumb`,
        itemListElement: validCrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url!.startsWith('http')
            ? crumb.url!
            : `${baseDomain}${crumb.url!.startsWith('/') ? crumb.url! : `/${crumb.url!}`}`,
        })),
      };
      graph.push(breadcrumbListEntity);
      webpageEntity.breadcrumb = { '@id': `${options.url}#breadcrumb` };
    }
  }

  // Service
  if (options.service) {
    const serviceEntity = {
      '@type': 'Service',
      '@id': `${options.service.url}#service`,
      name: options.service.name,
      serviceType: options.service.serviceType,
      description: options.service.description,
      url: options.service.url,
      provider: { '@id': orgId },
      areaServed: 'Worldwide',
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          options.service.audienceType ||
          'Local businesses, D2C brands and e-commerce brands',
      },
    };
    graph.push(serviceEntity);
  }

  // FAQs
  if (options.faqs && options.faqs.length > 0) {
    const faqEntity = {
      '@type': 'FAQPage',
      '@id': `${options.url}#faq`,
      mainEntity: options.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    graph.push(faqEntity);
  }

  // Blog post / Article
  if (options.blogPost) {
    const blogEntity: any = {
      '@type': 'BlogPosting',
      '@id': `${options.blogPost.url}#article`,
      headline: options.blogPost.title,
      description: options.blogPost.description,
      url: options.blogPost.url,
      mainEntityOfPage: options.blogPost.url,
      datePublished: options.blogPost.datePublished,
      dateModified: options.blogPost.dateModified || options.blogPost.datePublished,
      author: { '@id': founderId },
      publisher: { '@id': orgId },
      inLanguage: 'en',
    };
    if (options.blogPost.image) {
      blogEntity.image = [options.blogPost.image];
    }
    graph.push(blogEntity);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

