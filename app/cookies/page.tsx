'use client';

import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useLanguage } from '../utils/languageContext';

export default function CookiePolicy() {
  const { t } = useLanguage();
  const content = t('cookies');

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
              {content.sections.whatAre.title}
            </Typography>
            <Typography variant="body1">
              {content.sections.whatAre.content}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.types.title}
            </Typography>
            <List>
              {content.sections.types.items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.noThirdParty.title}
            </Typography>
            <Typography variant="body1">
              {content.sections.noThirdParty.content}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.consent.title}
            </Typography>
            <Typography variant="body1">
              {content.sections.consent.content}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
} 