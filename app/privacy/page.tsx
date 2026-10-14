'use client';

import { useLanguage } from '../utils/languageContext';
import { Locale } from '../utils/locales';
import LegalPageLayout, { LegalSection } from '../components/legal/LegalPageLayout';

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const content = t('privacy') as unknown as Locale['privacy'];
  const { sections: s } = content;

  const sections: LegalSection[] = [
    { id: 'responsible', title: s.responsible.title, items: s.responsible.items },
    { id: 'data-collected', ...s.dataCollected },
    { id: 'how-we-collect', ...s.howWeCollect },
    { id: 'data-usage', ...s.dataUsage },
    { id: 'third-party', ...s.thirdParty },
    { id: 'data-retention', ...s.dataRetention },
    { id: 'minors', ...s.minors },
    {
      id: 'rights',
      title: s.rights.title,
      intro: s.rights.intro,
      items: s.rights.items,
      outro: s.rights.contact,
    },
  ];

  return (
    <LegalPageLayout
      title={content.title}
      lastUpdate={content.lastUpdate}
      intro={content.intro}
      sections={sections}
    />
  );
}
