import { Box, Typography } from '@mui/material';
import { lexendFont } from '../../../../utils/fonts';

interface SectionBadgeProps {
  label: string;
  primaryColor: string;
  labelColor: string;
}

export default function SectionBadge({ label, primaryColor, labelColor }: SectionBadgeProps) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        px: 2,
        py: 0.5,
        borderRadius: '20px',
        border: `1px solid ${primaryColor}44`,
        background: `${primaryColor}11`,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: primaryColor,
          boxShadow: `0 0 8px ${primaryColor}`,
        }}
      />
      <Typography
        sx={{
          fontFamily: lexendFont.style.fontFamily,
          fontSize: '0.75rem',
          fontWeight: 500,
          color: labelColor,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
