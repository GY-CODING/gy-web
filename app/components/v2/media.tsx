'use client';

// Pictures of the products shared by every /v2 page: the real screenshots (WebP copies).

import { Box } from '@mui/material';
import Image from 'next/image';
import { PRODUCTS, ProductId } from '../../products/data/products';

export function Shot({ id, isDark, name, sizes = '(max-width: 900px) 100vw, 62vw' }: { id: ProductId; isDark: boolean; name: string; sizes?: string }) {
  const p = PRODUCTS[id];
  // GY Accounts: its dashboard, captured from the app (products.ts has no image for it).
  const png = id === 'gy-accounts' ? '/images/products/accounts/accounts.png' : isDark && p.imageDark ? p.imageDark : p.image;
  // /v2 uses WebP copies of the screenshots (≈10× lighter, 1800px wide); the PNGs stay for the live site.
  const src = png?.replace(/\.png$/, '.webp');
  const size: Record<string, [number, number]> = {
    '/images/products/wingwords.webp': [1800, 1494],
    '/images/products/heralds-dark.webp': [1800, 1468],
    '/images/products/heralds-light.webp': [1800, 1464],
    '/images/products/wingwords-2.webp': [1800, 805],
    '/images/products/accounts/accounts.webp': [1800, 1022],
  };
  if (!src) return null;
  const [w, h] = size[src] ?? [1600, 1200];
  const img = (
    <Image
      src={src}
      alt={name}
      width={w}
      height={h}
      sizes={sizes}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
  // A flat browser capture (no mockup around it) gets a window's rounded corners.
  return id === 'gy-accounts' ? (
    <Box sx={{ borderRadius: { xs: '12px', md: '18px' }, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}>{img}</Box>
  ) : (
    img
  );
}
