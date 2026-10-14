'use client';

import { Box, Container, Typography, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import { lexendFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import AuroraBackground from '../../components/home/AuroraBackground';
import EyebrowBadge from '../../components/home/EyebrowBadge';
import AnimatedGradientHeadline from '../../components/home/AnimatedGradientHeadline';
import TiltCard from '../../components/home/TiltCard';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    email: string;
    portfolio: string;
  };
}

const SocialIcon = ({ type, url }: { type: string; url: string }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getIcon = () => {
    switch (type) {
      case 'github':
        return <GitHub fontSize="small" />;
      case 'linkedin':
        return <LinkedIn fontSize="small" />;
      case 'email':
        return <Email fontSize="small" />;
      case 'portfolio':
        return <LanguageIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <IconButton
      component="a"
      href={type === 'email' ? `mailto:${url}` : url}
      target={type === 'email' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      sx={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
        color: isDark ? 'grey.300' : 'grey.700',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#8C54FF',
          color: '#8C54FF',
          transform: 'translateY(-3px)',
          boxShadow: '0 10px 25px -8px rgba(140,84,255,0.5)',
        },
      }}
    >
      {getIcon()}
    </IconButton>
  );
};

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true, margin: '-80px' }}
      style={{ height: '100%', width: '100%' }}
    >
      <TiltCard maxTilt={4}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            p: { xs: 3, sm: 4 },
            borderRadius: '28px',
            backgroundColor: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(14px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.45)' : '0 20px 60px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '250px', sm: '300px' },
                borderRadius: '20px',
                overflow: 'hidden',
                mb: { xs: 3, sm: 4 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  boxShadow: isDark
                    ? 'inset 0 0 20px 10px rgba(0,0,0,0.2)'
                    : 'inset 0 0 20px 10px rgba(0,0,0,0.1)',
                  zIndex: 1,
                  pointerEvents: 'none',
                },
              }}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={1000}
                height={1000}
                style={{
                  objectFit: 'contain',
                  transform: isEven ? 'scale(1.02) rotate(1deg)' : 'scale(1.02) rotate(-1deg)',
                  width: '100%',
                  height: '100%',
                  filter: isDark
                    ? 'brightness(1.1) contrast(0.95)'
                    : 'brightness(1.05) contrast(0.98)',
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  fontWeight: 600,
                  mb: 1,
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {member.name}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  color: isDark ? 'grey.300' : 'grey.700',
                  mb: { xs: 2, sm: 3 },
                }}
              >
                {member.role}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  color: isDark ? 'grey.400' : 'grey.600',
                  mb: { xs: 3, sm: 4 },
                  lineHeight: 1.7,
                }}
              >
                {member.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 3, sm: 4 } }}>
                {member.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.5, sm: 1 },
                        borderRadius: '8px',
                        backgroundColor: isDark
                          ? 'rgba(99, 102, 241, 0.2)'
                          : 'rgba(99, 102, 241, 0.1)',
                        color: isDark ? 'rgba(99, 102, 241, 0.9)' : 'rgba(99, 102, 241, 1)',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontFamily: lexendFont.style.fontFamily,
                      }}
                    >
                      {skill}
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 } }}>
                <SocialIcon type="github" url={member.social.github} />
                <SocialIcon type="linkedin" url={member.social.linkedin} />
                <SocialIcon type="email" url={member.social.email} />
                <SocialIcon type="portfolio" url={member.social.portfolio} />
              </Box>
            </Box>
          </Box>
        </Box>
      </TiltCard>
    </motion.div>
  );
};

export default function TeamPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLanguage();
  const teamMembers = t('team.members') as unknown as TeamMember[];

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        pt: { xs: '112px', sm: '120px', md: '128px' },
        pb: { xs: 10, md: 14 },
      }}
    >
      <AuroraBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 8, md: 10 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <EyebrowBadge>{t('team.eyebrow')}</EyebrowBadge>
          </Box>

          <AnimatedGradientHeadline
            text={t('team.title')}
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.8rem' },
              lineHeight: 1.08,
              mb: 3,
              textAlign: 'center',
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              color: isDark ? 'grey.300' : 'grey.700',
              lineHeight: 1.6,
            }}
          >
            {t('team.description')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 6 },
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'stretch' },
          }}
        >
          {Array.isArray(teamMembers) &&
            teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
        </Box>
      </Container>
    </Box>
  );
}
