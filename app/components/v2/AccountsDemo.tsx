'use client';

// A working replica of the GY Accounts dashboard — the identity card scene (front: photo, name,
// roles; back: the API key) and the "Personal information" sheet, as they really are today
// (gy-accounts /, formerly its /v2 prototype). The GYCODING account, as in the app's own capture
// (public/images/products/accounts/accounts.png). The product page's features play it as they
// scroll past: each step performs one thing the product really does. English, as the app. The
// API key shown when revealed is a placeholder, not a real key.
//
// Drawn at a fixed virtual size (1000×680) and scaled to fit its frame, so it looks the same at
// every width. Motion: transform/opacity only; reduced motion shows each step's end state. The
// card itself crossfades between its two faces rather than spinning in 3D — the real dashboard's
// own "pause animations" mode does the same, and it reads just as clearly at demo scale.

import { Box } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { lexendFont, valorantFont } from '../../utils/fonts';

const W = 1000;
const H = 680;
const P = { primary: '#8C54FF', secondary: '#6d28d9', accent: '#a855f7' };
const T = { primary: '#ffffff', secondary: '#e0e0e0', tertiary: '#bdbdbd', muted: '#9e9e9e' };
const GRAD = 'linear-gradient(135deg, #a855f7, #6366f1)';
// Same gradient as the real card's two faces (IdentityScene.tsx).
const FACE_BG = 'linear-gradient(150deg, #24104f 0%, #140a33 45%, #0a0620 100%)';
const STRIPE_BG = 'linear-gradient(180deg, #050208 0%, #120a22 100%)';
const overline = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: T.muted,
} as const;
const ease = [0.16, 1, 0.3, 1] as const;
const brand = {
  fontFamily: valorantFont.style.fontFamily,
  fontWeight: 400,
  fontSynthesis: 'none',
  fontKerning: 'none',
} as const;
const lexend = { fontFamily: lexendFont.style.fontFamily } as const;

// The account shown in the app's own capture.
const PROFILE = {
  name: 'GYCODING',
  email: 'gycoding05@gmail.com',
  user: 'GYCODING',
  userEdited: 'GYCODING Studio',
  phone: '+34 123456780',
  key: 'gy_xxxxxxxxxxxxxxxxxxxxxxxx',
};

const ROLE = {
  DEVELOPER: { c: '#60a5fa', label: 'Developer' },
  COMMON: { c: '#a855f7', label: 'Common' },
  ADMIN: { c: '#4ade80', label: 'Admin' },
};

function Chip({ role, delay = 0 }: { role: keyof typeof ROLE; delay?: number }) {
  const r = ROLE[role];
  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 8,
        border: `1px solid ${r.c}44`,
        background: `${r.c}1a`,
        color: r.c,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 3, background: r.c }} />
      {r.label}
    </motion.span>
  );
}

// Text that types itself in (characters revealed one by one).
function Typed({
  text,
  delay = 0,
  speed = 0.05,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return setN(text.length);
    setN(0);
    let i = 0;
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(timer);
      }, speed * 1000);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, delay, speed, reduce]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span style={{ opacity: 0.6 }}>|</span>}
    </>
  );
}

function Row({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: wide ? '1 / -1' : undefined,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px 10px 10px',
        borderRadius: 14,
        background: `${P.primary}0f`,
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: `${P.primary}1f`,
          flexShrink: 0,
        }}
      />
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 11, color: '#6e6e73' }}>{label}</span>
        <span
          style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 700,
            color: '#1d1d1f',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {children}
        </span>
      </span>
    </div>
  );
}

function Toast({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease, delay: 1.6 }}
      style={{
        position: 'absolute',
        left: 24,
        bottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        borderRadius: 14,
        background: 'rgba(14,14,20,0.92)',
        borderLeft: '3px solid #22c55e',
        color: T.primary,
        fontSize: 14,
        zIndex: 6,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          background: '#22c55e',
          boxShadow: '0 0 10px #22c55e',
        }}
      />
      {text}
    </motion.div>
  );
}

// step: 0 sign-in · 1 roles · 2 API key (the card's back) · 3 profile edit (the info sheet)
//       4 instant auth (the account pill) · 5 unified ecosystem (the account menu)
function Avatar({ size }: { size: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', padding: 3, background: GRAD }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#ffffff',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Image
          src="/gy-logo.png"
          alt=""
          width={Math.round(size * 0.52)}
          height={Math.round(size * 0.52)}
        />
      </div>
    </div>
  );
}

function Dashboard({ step }: { step: number }) {
  const ring = `0 0 0 2px ${P.primary}, 0 0 50px ${P.primary}55`;
  const showBack = step === 2;
  const editing = step === 3;
  const menuOpen = step === 5;
  const user = step >= 3 ? PROFILE.userEdited : PROFILE.user;

  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: H,
        overflow: 'hidden',
        borderRadius: 24,
        color: T.primary,
        background: '#0c0820',
      }}
    >
      {/* the stage's glow and grid, as the real scene */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(140,84,255,0.30) 0%, transparent 70%)',
        }}
      />

      {/* bar: just "Gy ACCOUNTS" + pause + the account pill — the real one has no products menu */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 44px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/gy-logo.png" alt="" width={26} height={26} />
          <span style={{ ...brand, fontSize: 18, letterSpacing: '0.04em' }}>Gy ACCOUNTS</span>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              display: 'grid',
              placeItems: 'center',
              border: '1.5px solid rgba(255,255,255,0.22)',
              fontSize: 13,
            }}
          >
            ❚❚
          </span>
          <motion.div
            animate={step === 4 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              height: 36,
              padding: '0 12px 0 4px',
              borderRadius: 999,
              background: `rgba(255,255,255,${menuOpen || step === 4 ? 0.12 : 0.06})`,
              boxShadow: step === 4 ? ring : 'none',
              transition: 'box-shadow 0.6s ease, background-color 0.3s ease',
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                padding: 2,
                background: GRAD,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <span
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Image src="/gy-logo.png" alt="" width={14} height={14} />
              </span>
            </span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{PROFILE.user}</span>
          </motion.div>

          {/* the account menu, exactly as the real one: Edit profile · Go to GYCODING · Log out */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.3, ease, delay: 0.2 }}
                style={{
                  position: 'absolute',
                  zIndex: 5,
                  right: 0,
                  top: 46,
                  width: 230,
                  padding: 8,
                  borderRadius: 16,
                  background: '#1d1b26',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.35)',
                }}
              >
                {[
                  ['✎', 'Edit profile'],
                  ['↗', 'Go to GYCODING'],
                ].map(([icon, label], k) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + k * 0.1, duration: 0.3, ease }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 10px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 500,
                      background: k === 0 ? 'rgba(255,255,255,0.06)' : 'transparent',
                    }}
                  >
                    <span style={{ opacity: 0.75 }}>{icon}</span>
                    {label}
                  </motion.div>
                ))}
                <div
                  style={{ height: 1, margin: '6px 4px', background: 'rgba(255,255,255,0.08)' }}
                />
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3, ease }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 10px',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#ff8a8a',
                  }}
                >
                  <span style={{ opacity: 0.75 }}>⏻</span>
                  Log out
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* the account's name as a monument behind the card, in Lexend like the real one */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 56,
          textAlign: 'center',
          ...lexend,
          fontWeight: 600,
          letterSpacing: '-0.03em',
          fontSize: 92,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.08)',
          opacity: step >= 3 ? 0.4 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        {PROFILE.name}
      </div>

      {/* the card: crossfades between its two faces, as the real one does when paused */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          margin: '92px auto 0',
          width: 400,
          aspectRatio: '1.586',
          opacity: step >= 3 ? 0.42 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        <div
          style={{
            ...overline,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -26,
            textAlign: 'center',
          }}
        >
          {showBack ? 'The back of the card' : 'Scroll to turn the card ↓'}
        </div>

        {/* front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            overflow: 'hidden',
            background: FACE_BG,
            boxShadow: step === 1 ? ring : 'none',
            opacity: showBack ? 0 : 1,
            transition: 'opacity 0.5s ease, box-shadow 0.6s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(#8C54FF1c 1px, transparent 1px), linear-gradient(90deg, #8C54FF1c 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 80% at 80% 0%, black 10%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'relative',
              height: '100%',
              padding: 22,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...brand, fontSize: 15, letterSpacing: '0.04em' }}>Gy ACCOUNTS</span>
              <Image src="/gy-logo.png" alt="" width={24} height={24} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar size={62} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 22, fontWeight: 700, ...lexend }}>{PROFILE.name}</div>
                <div style={{ fontSize: 12, color: '#c9bdf0' }}>{PROFILE.email}</div>
              </div>
            </div>
            <div
              key={`roles-${step === 1}`}
              style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}
            >
              <Chip role="ADMIN" delay={step === 1 ? 0.4 : 0} />
              <Chip role="DEVELOPER" delay={step === 1 ? 0.55 : 0} />
              <Chip role="COMMON" delay={step === 1 ? 0.7 : 0} />
            </div>
          </div>
        </div>

        {/* back: the API key */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            overflow: 'hidden',
            background: FACE_BG,
            boxShadow: showBack ? ring : 'none',
            opacity: showBack ? 1 : 0,
            transition: 'opacity 0.5s ease, box-shadow 0.6s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '15%',
              height: '21%',
              background: STRIPE_BG,
            }}
          />
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>
            <div style={{ fontSize: 11, color: '#c9bdf0' }}>API key</div>
            <div
              style={{
                marginTop: 6,
                padding: '8px 12px',
                borderRadius: 10,
                background: '#f5f0ff',
                color: '#1a0b3d',
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 13,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {showBack ? <Typed text={PROFILE.key} delay={0.5} speed={0.03} /> : '•'.repeat(22)}
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 10, fontSize: 12, color: '#c9bdf0' }}>
              <span>Show key</span>
              <motion.span
                key={`copy-${step}`}
                initial={false}
                animate={showBack ? { color: ['#c9bdf0', '#22c55e'] } : { color: '#c9bdf0' }}
                transition={{ duration: 0.4, delay: 1.7 }}
              >
                {showBack ? 'Copied!' : 'Copy'}
              </motion.span>
              <span>Edit to regenerate ›</span>
            </div>
          </div>
        </div>
      </div>

      {/* "Personal information": the light sheet below the card, as the real one */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 196,
          borderRadius: '28px 28px 0 0',
          background: '#f5f5f7',
          color: '#1d1d1f',
          padding: '20px 44px',
          opacity: step === 1 || showBack ? 0.4 : 1,
          boxShadow: editing ? `0 0 0 2px ${P.primary} inset` : 'none',
          transition: 'opacity 0.6s ease, box-shadow 0.6s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ ...overline, color: '#9a8fc9' }}>Profile</div>
            <div style={{ marginTop: 2, fontSize: 19, fontWeight: 700 }}>Personal information</div>
          </div>
          <div
            style={{
              height: 34,
              padding: '0 14px',
              borderRadius: 10,
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              background: GRAD,
            }}
          >
            {editing ? 'Save changes' : 'Edit profile'}
          </div>
        </div>
        <div
          style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}
        >
          <Row label="Username">
            {editing ? <Typed text={PROFILE.userEdited} delay={0.4} speed={0.08} /> : user}
          </Row>
          <Row label="Phone">{PROFILE.phone}</Row>
          <Row label="Email">{PROFILE.email}</Row>
        </div>
      </div>

      <AnimatePresence>
        {step === 3 && <Toast key="toast" text="Your profile has been updated" />}
      </AnimatePresence>

      {/* Sign-in (single sign-on): the GYCODING login, the email typing itself in */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 6,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(6,2,18,0.82)',
            }}
          >
            <div
              style={{
                width: 380,
                padding: 32,
                borderRadius: 24,
                background: '#ffffff',
                color: '#1d1d1f',
                textAlign: 'center',
              }}
            >
              <Image src="/gy-logo.png" alt="" width={48} height={48} />
              <div style={{ marginTop: 14, fontSize: 22, fontWeight: 600 }}>Welcome</div>
              <div style={{ marginTop: 4, fontSize: 13, color: '#6e6e73' }}>
                Log in to GYCODING to continue.
              </div>
              <div
                style={{
                  marginTop: 22,
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: `2px solid ${P.primary}`,
                  fontSize: 15,
                }}
              >
                <div style={{ fontSize: 11, color: P.secondary }}>Email address</div>
                <Typed text={PROFILE.email} delay={0.6} speed={0.05} />
              </div>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1, 0.95, 1] }}
                transition={{ duration: 0.5, delay: 1.9, times: [0, 0.3, 0.6, 1] }}
                style={{
                  marginTop: 14,
                  height: 46,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: '#7c3aed',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Continue
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Scales the 1000×680 replica to the width of its frame.
export default function AccountsDemo({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <Box
      ref={ref}
      aria-hidden
      sx={{ width: '100%', aspectRatio: `${W} / ${H}`, position: 'relative' }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        <Dashboard step={step} />
      </Box>
    </Box>
  );
}
