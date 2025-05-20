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
import { Locale } from '../utils/locales';

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const content = t('privacy') as unknown as Locale['privacy'];

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
              {content.sections.responsible.title}
            </Typography>
            <List>
              {content.sections.responsible.items.map((item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.dataCollected.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {content.sections.dataCollected.intro}
            </Typography>
            <List>
              {content.sections.dataCollected.items.map((item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.howWeCollect.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {content.sections.howWeCollect.intro}
            </Typography>
            <List>
              {content.sections.howWeCollect.items.map((item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.dataUsage.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {content.sections.dataUsage.intro}
            </Typography>
            <List>
              {content.sections.dataUsage.items.map((item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.thirdParty.title}
            </Typography>
            <Typography variant="body1">{content.sections.thirdParty.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.dataRetention.title}
            </Typography>
            <Typography variant="body1">{content.sections.dataRetention.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.minors.title}
            </Typography>
            <Typography variant="body1">{content.sections.minors.content}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
              {content.sections.rights.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {content.sections.rights.intro}
            </Typography>
            <List>
              {content.sections.rights.items.map((item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {content.sections.rights.contact}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
