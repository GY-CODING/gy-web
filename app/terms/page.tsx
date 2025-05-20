'use client';

import React from 'react';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';
import { useLanguage } from '../utils/languageContext';
import { Locale } from '../utils/locales';

export default function TermsOfService() {
  const { t } = useLanguage();
  const content = t('terms') as unknown as Locale['terms'];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {content.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {content.lastUpdate}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" paragraph>
            {content.intro}
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.object.title}
            </Typography>
            <Typography variant="body1">{content.sections.object.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.permittedUse.title}
            </Typography>
            <Typography variant="body1">{content.sections.permittedUse.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.registration.title}
            </Typography>
            <Typography variant="body1">{content.sections.registration.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.responsibility.title}
            </Typography>
            <Typography variant="body1">{content.sections.responsibility.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.modifications.title}
            </Typography>
            <Typography variant="body1">{content.sections.modifications.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.jurisdiction.title}
            </Typography>
            <Typography variant="body1">{content.sections.jurisdiction.content}</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
