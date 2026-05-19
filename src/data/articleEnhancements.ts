import type { Article } from './articles';
import { getArticleImageUri } from './topicMedia';

export type ArticleReference = {
  title: string;
  url: string;
};

type Enhancement = {
  sourceUrl: string;
  references: ArticleReference[];
};

/** Topic-specific official sources (not generic homepages only). */
export const ARTICLE_ENHANCEMENTS: Record<string, Enhancement> = {
  '1': {
    sourceUrl:
      'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/',
    references: [
      {
        title: 'PNP-ACG — CS Scams (e-wallet & SMS patterns)',
        url: 'https://acg.pnp.gov.ph/category/cs-scams/'
      },
      {
        title: 'BSP — AFASA Booklet & IRRs (RA 12010)',
        url: 'https://www.bsp.gov.ph/Regulations/Banking%20Laws/AFASA-Booklet-with-IRRs.pdf'
      },
      {
        title: 'GCash — Security & fraud help',
        url: 'https://www.gcash.com/help/topics/security'
      }
    ]
  },
  '2': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'DICT NCERT — Report phishing',
        url: 'https://www.ncert.gov.ph/'
      },
      {
        title: 'CISA — Avoiding phishing & social engineering',
        url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks'
      },
      {
        title: 'Meta — Facebook security settings',
        url: 'https://www.facebook.com/help/security'
      }
    ]
  },
  '3': {
    sourceUrl:
      'https://www.sec.gov.ph/lending-companies-and-financing-companies-2/advisories-and-notices/#gsc.tab=0',
    references: [
      {
        title:
          'SEC — Lending & financing companies: advisories and notices',
        url: 'https://www.sec.gov.ph/lending-companies-and-financing-companies-2/advisories-and-notices/#gsc.tab=0'
      },
      {
        title: 'SEC — General public advisories',
        url: 'https://www.sec.gov.ph/advisories/'
      },
      {
        title: 'NPC — Data privacy complaints',
        url: 'https://privacy.gov.ph/complaints/'
      }
    ]
  },
  '4': {
    sourceUrl:
      'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'CERT-PH (DICT NCERT)',
        url: 'https://www.ncert.gov.ph/'
      },
      {
        title: 'NIST — Digital identity guidelines (passwords)',
        url: 'https://pages.nist.gov/800-63-3/sp800-63b.html'
      }
    ]
  },
  '5': {
    sourceUrl: 'https://acg.pnp.gov.ph/category/cs-scams/',
    references: [
      {
        title: 'PNP-ACG — CS Scams tracker',
        url: 'https://acg.pnp.gov.ph/category/cs-scams/'
      },
      {
        title: 'NTC — SIM Registration (RA 11934)',
        url: 'https://ntc.gov.ph/sim-registration/'
      }
    ]
  },
  '6': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'CERT-PH — Incident reporting',
        url: 'https://www.ncert.gov.ph/'
      },
      {
        title: 'Google Safe Browsing — URL check',
        url: 'https://transparencyreport.google.com/safe-browsing/search'
      }
    ]
  },
  '7': {
    sourceUrl: 'https://www.sec.gov.ph/advisories/',
    references: [
      {
        title: 'SEC — Investment scam advisories',
        url: 'https://www.sec.gov.ph/advisories/'
      },
      {
        title: 'BSP — Virtual Asset Service Providers',
        url: 'https://www.bsp.gov.ph/Pages/Regulations/RegulationsList.aspx'
      },
      {
        title: 'NBI — Cybercrime Division',
        url: 'https://www.nbi.gov.ph/'
      }
    ]
  },
  '8': {
    sourceUrl: 'https://ntc.gov.ph/?s=sim+reg',
    references: [
      {
        title: 'NTC — SIM registration news & advisories',
        url: 'https://ntc.gov.ph/?s=sim+reg'
      },
      {
        title: 'Globe — Official SIM registration',
        url: 'https://simpleregistration.globe.com.ph/'
      },
      {
        title: 'NPC — RA 10173 (Data Privacy Act)',
        url: 'https://privacy.gov.ph/data-privacy-act/'
      }
    ]
  },
  '9': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'CERT-PH — Public Wi-Fi advisories',
        url: 'https://www.ncert.gov.ph/'
      },
      {
        title: 'DICT — Free Wi-Fi for All program',
        url: 'https://freewifi.gov.ph/'
      }
    ]
  },
  '10': {
    sourceUrl: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/',
    references: [
      {
        title: 'PNP-ACG — Cybersecurity bulletins',
        url: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/'
      },
      {
        title: 'FBI IC3 — Romance scam alerts',
        url: 'https://www.ic3.gov/Home/ConsumerAlerts'
      },
      {
        title: 'IACAT — Hotline 1343',
        url: 'https://iacat.gov.ph/'
      }
    ]
  },
  '11': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'PNP WCPC — Women & Children Protection',
        url: 'https://wcpc.pnp.gov.ph/'
      },
      {
        title: 'IACAT — Child trafficking hotline 1343',
        url: 'https://iacat.gov.ph/'
      },
      {
        title: 'DepEd — Anti-Bullying Act (RA 10627)',
        url: 'https://www.deped.gov.ph/'
      }
    ]
  },
  '12': {
    sourceUrl: 'https://privacy.gov.ph/data-privacy-act/',
    references: [
      {
        title: 'NPC — Data Privacy Act of 2012 (RA 10173)',
        url: 'https://privacy.gov.ph/data-privacy-act/'
      },
      {
        title: 'NPC — File a complaint',
        url: 'https://privacy.gov.ph/complaints/'
      }
    ]
  },
  '13': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'DICT NCERT — AI & cyber incident reporting',
        url: 'https://www.ncert.gov.ph/'
      },
      {
        title: 'CISA — Deepfake threats guidance',
        url: 'https://www.cisa.gov/topics/physical-security/deepfakes'
      }
    ]
  },
  '14': {
    sourceUrl:
      'https://www.bsp.gov.ph/SitePages/Regulations/RegulationsList.aspx',
    references: [
      {
        title: 'BSP — Supervised financial institutions',
        url: 'https://www.bsp.gov.ph/SitePages/Regulations/RegulationsList.aspx'
      },
      {
        title: 'DMW — OFW hotline 1348',
        url: 'https://www.dmw.gov.ph/'
      },
      {
        title: 'OWWA — Overseas Workers Welfare',
        url: 'https://owwa.gov.ph/'
      }
    ]
  },
  '15': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'BSP — QR Ph / digital payments',
        url: 'https://www.bsp.gov.ph/SitePages/InclusiveFinance/QRPh.aspx'
      },
      {
        title: 'CERT-PH — Quishing advisories',
        url: 'https://www.ncert.gov.ph/'
      }
    ]
  },
  '16': {
    sourceUrl: 'https://www.ncert.gov.ph/',
    references: [
      {
        title: 'CERT-PH — Ransomware incident response',
        url: 'https://www.ncert.gov.ph/'
      },
      {
        title: 'NPC — Personal data breach notification (72h)',
        url: 'https://privacy.gov.ph/data-breach/'
      }
    ]
  },
  '17': {
    sourceUrl:
      'https://www.bsp.gov.ph/SitePages/ConsumerFinance/ConsumerAssistance.aspx',
    references: [
      {
        title: 'BSP — Consumer assistance (card/ATM fraud)',
        url: 'https://www.bsp.gov.ph/SitePages/ConsumerFinance/ConsumerAssistance.aspx'
      },
      {
        title: 'RA 11765 — Financial Consumer Protection Act',
        url: 'https://www.bsp.gov.ph/'
      }
    ]
  },
  '18': {
    sourceUrl:
      'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/',
    references: [
      {
        title: 'Cybercrime Prevention Act (RA 10175) — full text',
        url: 'https://www.officialgazette.gov.ph/2012/09/12/republic-act-no-10175/'
      },
      {
        title: 'Safe Spaces Act (RA 11313)',
        url: 'https://www.officialgazette.gov.ph/2019/04/17/republic-act-no-11313/'
      },
      {
        title: 'NPC — Online harassment & doxxing complaints',
        url: 'https://privacy.gov.ph/complaints/'
      }
    ]
  }
};

const PNP_ACG_PHONE = '(02) 8723-0401 local 7491';

export function enhanceArticle(article: Article): Article {
  const patch = ARTICLE_ENHANCEMENTS[article.id];
  const image = getArticleImageUri(article.id, article.category);
  const authorities = article.authorities?.map((a) =>
    a.contact.includes('8414-1560')
      ? { ...a, contact: a.contact.replace('(02) 8414-1560', PNP_ACG_PHONE) }
      : a
  );

  if (!patch) {
    return { ...article, image, authorities };
  }

  return {
    ...article,
    image,
    sourceUrl: patch.sourceUrl,
    references: patch.references,
    authorities
  };
}

export function enhanceArticles(list: Article[]): Article[] {
  return list.map(enhanceArticle);
}
