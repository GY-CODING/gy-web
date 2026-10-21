'use client';

// Footer de todas las páginas de /v2.
//
// Antes terminaba con el wordmark GyCODING de borde a borde; achatado por el `textLength`, no
// gustaba. Ahora la marca va pequeña en su bloque, arriba a la izquierda, con las cuatro columnas
// de enlaces al lado — la posición del footer antiguo — y abajo la línea de copyright, idioma y
// volver arriba. Es sticky en escritorio, así que se descubre bajo la última pantalla.

import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector';
import { valorantFont } from '../../utils/fonts';
import { CONTACT_EMAIL, Copy, DISCORD_URL, GITHUB_URL, X_URL, ink } from './copy';

const MARGIN = { xs: '20px', md: '32px' };
const brandFont = {
  fontFamily: valorantFont.style.fontFamily,
  fontWeight: 400,
  fontSynthesis: 'none',
} as const;

export function MonumentFooter({ copy }: { copy: Copy }) {
  // /v2 es oscuro siempre.
  const c = ink(true);
  // El idioma vive aquí; el tema ya no se puede cambiar.
  const col = (title: string, links: { label: string; href: string; ext?: boolean }[]) => (
    <Box>
      <Box sx={{ fontSize: 15, fontWeight: 600, color: c.ground, mb: 1.5 }}>{title}</Box>
      {links.map((l) => (
        <Box key={l.label} sx={{ fontSize: 15, lineHeight: 2 }}>
          <Box
            component={l.ext ? 'a' : Link}
            href={l.href}
            {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            sx={{ color: c.softInverted, textDecoration: 'none', '&:hover': { color: c.ground } }}
          >
            {l.label}
          </Box>
        </Box>
      ))}
    </Box>
  );
  return (
    <Box
      component="footer"
      sx={{
        position: { md: 'sticky' },
        bottom: 0,
        zIndex: 0,
        background: c.ink,
        color: c.ground,
        px: MARGIN,
        pt: { xs: 6, md: 9 },
        pb: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: '1.6fr repeat(4, 1fr)' },
          columnGap: { md: 4 },
          rowGap: { xs: 5, md: 0 },
        }}
      >
        {/* La marca, en pequeño: logo, nombre y qué es esto. */}
        <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' }, pr: { md: 4 } }}>
          <Box
            component={Link}
            href="/"
            aria-label="GYCODING"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: 'inherit', textDecoration: 'none' }}
          >
            <Image src="/gy-logo.png" alt="" width={30} height={30} />
            {/* Valorant junta la C bajo el brazo de la y; sin kerning se separan. */}
            <Box component="span" sx={{ ...brandFont, fontSize: 21, lineHeight: 1, fontKerning: 'none' }}>
              GyCODING
            </Box>
          </Box>
          <Box sx={{ mt: 2, maxWidth: 320, fontSize: 15, lineHeight: 1.6, color: c.softInverted }}>
            {copy.heroSentence}
          </Box>
        </Box>

        {col(copy.footer.products, [
          { label: 'Wingwords', href: '/products/wingwords/' },
          { label: 'GY Accounts', href: '/products/gy-accounts/' },
          { label: 'Heralds of Chaos', href: '/products/heralds-of-chaos/' },
        ])}
        {col(copy.footer.studio, [
          { label: copy.footer.team, href: '/team/' },
          { label: copy.footer.company, href: '/company/' },
        ])}
        {col(copy.footer.community, [
          { label: 'Discord', href: DISCORD_URL, ext: true },
          { label: 'GitHub', href: GITHUB_URL, ext: true },
          { label: 'X', href: X_URL, ext: true },
          { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ext: true },
        ])}
        {col(copy.footer.legal, [
          { label: copy.footer.privacy, href: '/privacy' },
          { label: copy.footer.terms, href: '/terms' },
          { label: copy.footer.cookies, href: '/cookies' },
        ])}
      </Box>

      <Box
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          mt: { xs: 6, md: 8 },
          pt: 3,
          borderTop: `1px solid color-mix(in srgb, ${c.ground} 14%, transparent)`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 14.5,
          color: c.softInverted,
        }}
      >
        <span>
          © {new Date().getFullYear()}{' '}
          <Box component="span" sx={{ ...brandFont, fontKerning: 'none' }}>
            GyCODING
          </Box>{' '}
          · {copy.footer.rights}
        </span>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LanguageSelector />
          <Box
            component="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              border: 0,
              background: 'none',
              color: 'inherit',
              cursor: 'pointer',
              font: 'inherit',
              p: 0,
              '&:hover': { color: c.ground },
            }}
          >
            {copy.footer.back} ↑
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
