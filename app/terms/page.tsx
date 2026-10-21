'use client';

import { useLanguage } from '../utils/languageContext';
import { Locale } from '../utils/locales';
import LegalPageLayout, { LegalSection } from '../components/legal/LegalPageLayout';
import { TonePage } from '../components/v2/kit';

export default function TermsOfService() {
  const { t } = useLanguage();
  const content = t('terms') as unknown as Locale['terms'];
  const { sections: s } = content;

  const sections: LegalSection[] = [
    { id: 'object', ...s.object },
    { id: 'permitted-use', ...s.permittedUse },
    { id: 'registration', ...s.registration },
    { id: 'responsibility', ...s.responsibility },
    { id: 'modifications', ...s.modifications },
    { id: 'jurisdiction', ...s.jurisdiction },
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
