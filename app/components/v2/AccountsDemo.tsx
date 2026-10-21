'use client';

// A working replica of the GY Accounts dashboard (gy-accounts: header, identity card, personal
// information, API access, footer), with the GYCODING account exactly as in the app's capture
// (public/images/products/accounts/accounts.png). The product page's features play it as they
// scroll past: each step performs one thing the product really does. English, as the app.
// The API key shown when revealed is a placeholder, not a real key.
//
// Drawn at a fixed virtual size (1000×680) and scaled to fit its frame, so it looks the same at
// every width. Motion: transform/opacity only; reduced motion shows each step's end state.

import { Box } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../../products/data/products';
import { valorantFont } from '../../utils/fonts';

const W = 1000;
const H = 680;
const P = { primary: '#8C54FF', secondary: '#6d28d9', accent: '#a855f7' };
const T = { primary: '#ffffff', secondary: '#e0e0e0', tertiary: '#bdbdbd', muted: '#9e9e9e' };
const GRAD = 'linear-gradient(135deg, #a855f7, #6366f1)';
const card = {
  background: 'rgba(17,17,17,0.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '24px',
  padding: '22px',
} as const;
const overline = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.muted } as const;
const ease = [0.16, 1, 0.3, 1] as const;

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
function Typed({ text, delay = 0, speed = 0.05 }: { text: string; delay?: number; speed?: number }) {
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

function Row({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div
      style={{
        gridColumn: wide ? '1 / -1' : undefined,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px 10px 10px',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span style={{ width: 34, height: 34, borderRadius: 10, background: `${P.primary}1f`, border: `1px solid ${P.primary}33`, flexShrink: 0 }} />
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 11, color: T.tertiary }}>{label}</span>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: T.primary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span>
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
        zIndex: 5,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 4, background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
      {text}
    </motion.div>
  );
}

// step: 0 sign-in · 1 roles · 2 API key · 3 profile edit · 4 instant auth (the open session)
//       5 unified ecosystem (the Products menu, as in the app's header)
function Avatar({ size }: { size: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', padding: 3, background: GRAD }}>
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ffffff', display: 'grid', placeItems: 'center' }}>
        <Image src="/gy-logo.png" alt="" width={Math.round(size * 0.52)} height={Math.round(size * 0.52)} />
      </div>
    </div>
  );
}

function Dashboard({ step }: { step: number }) {
  const ring = `0 0 0 2px ${P.primary}, 0 0 50px ${P.primary}55`;
  const focus = (k: 'identity' | 'info' | 'api' | 'pill' | 'menu') => {
    const map: Record<number, string[]> = { 0: [], 1: ['identity'], 2: ['api'], 3: ['identity', 'info'], 4: ['pill'], 5: ['menu'] };
    const on = map[step] ?? [];
    const dim = on.length > 0 && !on.includes(k);
    return { opacity: dim ? 0.38 : 1, boxShadow: on.includes(k) ? ring : 'none', transition: 'opacity 0.6s ease, box-shadow 0.6s ease' } as const;
  };
  const editing = step === 3;
  const user = step >= 4 ? PROFILE.userEdited : PROFILE.user;
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', borderRadius: 24, color: T.primary, background: 'linear-gradient(160deg,#0a0020 0%,#1a0045 40%,#050010 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(140,84,255,.25) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#8C54FF18 1px, transparent 1px), linear-gradient(90deg, #8C54FF18 1px, transparent 1px)', backgroundSize: '60px 60px', WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 30%, black 20%, transparent 80%)' }} />

      {/* header: logo + wordmark, Products / Docs / About, theme, account pill */}
      <div style={{ position: 'relative', zIndex: 3, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/gy-logo.png" alt="" width={30} height={30} />
          <span style={{ fontFamily: valorantFont.style.fontFamily, fontWeight: 400, fontSize: 18, letterSpacing: '0.04em' }}>Gy ACCOUNTS</span>
          <span style={{ marginLeft: 30, display: 'flex', gap: 22, fontSize: 13, color: T.secondary }}>
            <span style={{ position: 'relative', padding: '6px 8px', borderRadius: 10, ...focus('menu'), boxShadow: 'none', background: step === 5 ? 'rgba(255,255,255,0.08)' : 'transparent', color: step === 5 ? T.primary : T.secondary }}>
              Products ▾
            </span>
            <span style={{ padding: '6px 0', opacity: step === 5 || step === 4 ? 0.38 : 1, transition: 'opacity 0.6s ease' }}>Docs ▾</span>
            <span style={{ padding: '6px 0', opacity: step === 5 || step === 4 ? 0.38 : 1, transition: 'opacity 0.6s ease' }}>About ▾</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fbbf24', fontSize: 15, opacity: step >= 4 ? 0.38 : 1, transition: 'opacity 0.6s ease' }}>☀</span>
          <motion.div
            animate={step === 4 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px 0 4px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', ...focus('pill') }}
          >
            <span style={{ width: 28, height: 28, borderRadius: 7, background: '#fff', display: 'grid', placeItems: 'center' }}>
              <Image src="/gy-logo.png" alt="" width={18} height={18} />
            </span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{user}</span>
          </motion.div>
        </div>
      </div>

      {/* Products menu (unified ecosystem): the header's own dropdown */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
            style={{ position: 'absolute', zIndex: 4, top: 60, left: 230, width: 340, padding: 8, borderRadius: 16, background: 'rgba(14,14,20,0.96)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: ring }}
          >
            {[
              ['Wingwords', PRODUCTS.wingwords.logo, PRODUCTS.wingwords.tagline],
              ['Heralds of Chaos', PRODUCTS['heralds-of-chaos'].logo, PRODUCTS['heralds-of-chaos'].tagline],
              ['GY Accounts', PRODUCTS['gy-accounts'].logo, PRODUCTS['gy-accounts'].tagline],
            ].map(([n, logo, line], k) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + k * 0.12, duration: 0.4, ease }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, background: k === 0 ? 'rgba(140,84,255,0.10)' : 'transparent' }}
              >
                <Image src={logo} alt="" width={28} height={28} style={{ objectFit: 'contain' }} />
                <span>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{n}</span>
                  <span style={{ display: 'block', fontSize: 12, color: T.tertiary }}>{line}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* page: identity card | personal information + API access */}
      <div style={{ position: 'relative', padding: '26px 60px 0', display: 'grid', gridTemplateColumns: '270px 1fr', gap: 18, alignItems: 'start', opacity: step >= 4 ? 0.38 : 1, transition: 'opacity 0.6s ease' }}>
        <div style={{ ...card, padding: 0, overflow: 'hidden', ...focus('identity'), opacity: undefined }}>
          <div style={{ height: 76, background: '#0d0428', borderBottom: `1px solid ${P.primary}22`, backgroundImage: `linear-gradient(${P.primary}22 1px, transparent 1px), linear-gradient(90deg, ${P.primary}22 1px, transparent 1px)`, backgroundSize: '22px 22px' }} />
          <div style={{ padding: '0 20px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -46 }}>
              <div style={{ borderRadius: '50%', boxShadow: '0 0 0 4px rgba(17,17,17,.9), 0 20px 45px -12px #8C54FF88' }}>
                <Avatar size={92} />
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 19, fontWeight: 700 }}>{PROFILE.name}</div>
            <div style={{ fontSize: 12.5, color: T.tertiary }}>{PROFILE.email}</div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={overline}>Roles</div>
              <div key={`roles-${step === 1}`} style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
                <Chip role="ADMIN" delay={step === 1 ? 0.4 : 0} />
                <Chip role="DEVELOPER" delay={step === 1 ? 0.55 : 0} />
                <Chip role="COMMON" delay={step === 1 ? 0.7 : 0} />
              </div>
            </div>
            <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
              <div style={{ height: 40, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, background: GRAD, boxShadow: '0 10px 30px -8px #8C54FF99' }}>
                {editing ? 'Save changes' : '✎  Edit profile'}
              </div>
              <div style={{ height: 40, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, border: editing ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid #ef444466', color: editing ? T.primary : '#ef4444' }}>
                {editing ? 'Cancel' : 'Log out'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 18 }}>
          <div style={{ ...card, ...focus('info'), opacity: step === 1 || step === 2 ? 0.38 : 1 }}>
            <div style={overline}>Profile</div>
            <div style={{ marginTop: 4, fontSize: 17, fontWeight: 600 }}>Personal information</div>
            <div style={{ fontSize: 12, color: T.tertiary }}>This is how you appear across every GYCODING product.</div>
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {editing ? (
                <>
                  <div style={{ padding: '8px 12px', borderRadius: 14, border: `1px solid ${P.primary}`, boxShadow: `0 0 0 4px ${P.primary}22` }}>
                    <div style={{ fontSize: 10, color: T.tertiary }}>Username</div>
                    <div style={{ fontSize: 14 }}>
                      <Typed text={PROFILE.userEdited} delay={0.4} speed={0.08} />
                    </div>
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: 10, color: T.tertiary }}>Phone</div>
                    <div style={{ fontSize: 14 }}>{PROFILE.phone}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1', padding: '8px 12px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', opacity: 0.55 }}>
                    <div style={{ fontSize: 10, color: T.tertiary }}>Email</div>
                    <div style={{ fontSize: 14 }}>{PROFILE.email}</div>
                  </div>
                </>
              ) : (
                <>
                  <Row label="Username">{user}</Row>
                  <Row label="Phone">{PROFILE.phone}</Row>
                  <Row label="Email" wide>
                    {PROFILE.email}
                  </Row>
                </>
              )}
            </div>
          </div>

          <div style={{ ...card, ...focus('api'), opacity: step === 1 || step === 3 ? 0.38 : 1 }}>
            <div style={overline}>Developers</div>
            <div style={{ marginTop: 4, fontSize: 17, fontWeight: 600 }}>API access</div>
            <div style={{ fontSize: 12, color: T.tertiary }}>Use this key to authenticate requests to the GYCODING APIs. Keep it secret — anyone with it can act on your behalf.</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 8px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ width: 30, height: 30, borderRadius: 10, display: 'grid', placeItems: 'center', background: step === 2 ? `${P.primary}1a` : 'transparent', color: step === 2 ? P.primary : T.muted, fontSize: 14 }}>👁</span>
              <span style={{ flex: 1, fontSize: 14, letterSpacing: step === 2 ? '0.02em' : '0.15em', fontFamily: step === 2 ? 'ui-monospace, Menlo, monospace' : 'inherit' }}>
                {step === 2 ? <Typed text={PROFILE.key} delay={0.5} speed={0.03} /> : '••••••••••••••••••••••••••••'}
              </span>
              <motion.span
                key={`copy-${step}`}
                initial={false}
                animate={step === 2 ? { scale: [1, 1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, delay: 1.7, times: [0, 0.4, 0.7, 1] }}
                style={{ width: 30, height: 30, borderRadius: 10, display: 'grid', placeItems: 'center', fontSize: 14, color: step === 2 ? '#22c55e' : T.muted }}
              >
                {step === 2 ? '✓' : '⧉'}
              </motion.span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: T.muted }}>{step === 2 ? 'Copied!' : 'Enter edit mode to regenerate your key.'}</div>
          </div>
        </div>
      </div>

      {/* footer strip, as in the app */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,0,16,0.6)', fontSize: 12, color: T.secondary, opacity: step >= 4 ? 0.38 : 1, transition: 'opacity 0.6s ease' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600 }}>
          <Image src="/gy-logo.png" alt="" width={16} height={16} />
          GYCODING
        </span>
        <span style={{ display: 'flex', gap: 22 }}>
          <span>GYCODING</span>
          <span>GY Accounts</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </span>
      </div>

      <AnimatePresence>{step === 3 && <Toast key="toast" text="Your profile has been updated" />}</AnimatePresence>

      {/* Sign-in (single sign-on): the GYCODING login, the email typing itself in */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease }}
            style={{ position: 'absolute', inset: 0, zIndex: 6, display: 'grid', placeItems: 'center', background: 'rgba(6,2,18,0.82)' }}
          >
            <div style={{ width: 380, padding: 32, borderRadius: 24, background: '#ffffff', color: '#1d1d1f', textAlign: 'center' }}>
              <Image src="/gy-logo.png" alt="" width={48} height={48} />
              <div style={{ marginTop: 14, fontSize: 22, fontWeight: 600 }}>Welcome</div>
              <div style={{ marginTop: 4, fontSize: 13, color: '#6e6e73' }}>Log in to GYCODING to continue.</div>
              <div style={{ marginTop: 22, textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: `2px solid ${P.primary}`, fontSize: 15 }}>
                <div style={{ fontSize: 11, color: P.secondary }}>Email address</div>
                <Typed text={PROFILE.email} delay={0.6} speed={0.05} />
              </div>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1, 0.95, 1] }}
                transition={{ duration: 0.5, delay: 1.9, times: [0, 0.3, 0.6, 1] }}
                style={{ marginTop: 14, height: 46, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#7c3aed', color: '#fff', fontWeight: 600, fontSize: 15 }}
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
    <Box ref={ref} aria-hidden sx={{ width: '100%', aspectRatio: `${W} / ${H}`, position: 'relative' }}>
      <Box sx={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
        <Dashboard step={step} />
      </Box>
    </Box>
  );
}
