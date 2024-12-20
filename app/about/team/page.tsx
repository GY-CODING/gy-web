'use client';

import { Box, Container, Typography, useTheme, IconButton } from '@mui/material';
import { lexendFont, valorantFont } from '../../utils/fonts';
import FadeIn from '../../components/animations/FadeIn';
import ParallaxScroll from '../../components/animations/ParallaxScroll';
import AnimatedBackground from '../../components/animations/AnimatedBackground';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

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
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Guillermo Figueras',
    role: 'CEO & FrontEnd Developer',
    description: 'Passionate about creating elegant and efficient solutions. Specialized in modern web technologies and cloud architecture.',
    image: '/team/guillermo.jpg',
    skills: ['React', 'NextJS', 'TypeScript', 'Unity', 'Material UI'],
    social: {
      github: 'https://github.com/gyfigueras',
      linkedin: 'https://linkedin.com/in/guillermo-figueras',
      email: 'guillermo@gycoding.com'
    }
  },
  {
    name: 'Ivan Vicente',
    role: 'CEO & BackEnd Developer',
    description: 'Expert in building scalable applications and optimizing performance. Focused on delivering exceptional user experiences.',
    image: '/team/ivan.jpg',
    skills: ['Java', 'Spring Boot', 'C#', 'NodeJS', 'MongoDB'],
    social: {
      github: 'https://github.com/ivanvicente',
      linkedin: 'https://linkedin.com/in/ivan-vicente',
      email: 'ivan@gycoding.com'
    }
  }
];

const SocialIcon = ({ type, url }: { type: string; url: string }) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'github':
        return <GitHub />;
      case 'linkedin':
        return <LinkedIn />;
      case 'email':
        return <Email />;
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
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.1)' 
          : 'rgba(0,0,0,0.05)',
        color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.2)' 
            : 'rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {getIcon()}
    </IconButton>
  );
};

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const theme = useTheme();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          p: { xs: 3, sm: 4 },
          borderRadius: '24px',
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(17,17,17,0.8)'
            : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(0,0,0,0.6)'
              : '0 12px 40px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: '250px', sm: '300px' },
              borderRadius: '16px',
              overflow: 'hidden',
              mb: { xs: 3, sm: 4 },
            }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              style={{
                objectFit: 'cover',
                transform: isEven ? 'scale(1.02) rotate(1deg)' : 'scale(1.02) rotate(-1deg)',
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
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                mb: { xs: 2, sm: 3 },
              }}
            >
              {member.role}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
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
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(99, 102, 241, 0.2)'
                        : 'rgba(99, 102, 241, 0.1)',
                      color: theme.palette.mode === 'dark'
                        ? 'rgba(99, 102, 241, 0.9)'
                        : 'rgba(99, 102, 241, 1)',
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
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default function TeamPage() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        pt: { xs: '80px', sm: '100px', md: '120px' },
        pb: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedBackground />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FadeIn direction="up">
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 8, md: 12 },
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 600,
                mb: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              A passionate duo of developers dedicated to transforming ideas into exceptional digital experiences
            </Typography>
          </Box>
        </FadeIn>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, sm: 5, md: 6 },
            width: '100%',
            px: { xs: 2, sm: 4 },
          }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
