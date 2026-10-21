'use client';

import { useLanguage } from '../utils/languageContext';
import { Locale } from '../utils/locales';
import LegalPageLayout, { LegalSection } from '../components/legal/LegalPageLayout';
import { TonePage } from '../components/v2/kit';

export default function CookiePolicy() {
  const { t } = useLanguage();
  const content = t('cookies') as unknown as Locale['cookies'];
  const { sections: s } = content;

  const sections: LegalSection[] = [
    { id: 'what-are', ...s.whatAre },
    { id: 'types', ...s.types },
    { id: 'no-third-party', ...s.noThirdParty },
    { id: 'consent', ...s.consent },
  ];

  return (
    <TonePage>
      <LegalPageLayout
        title={content.title}
        lastUpdate={content.lastUpdate}
        intro={content.intro}
        sections={sections}
      />
    </TonePage>
  );
}
