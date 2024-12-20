'use client';

import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/icons-material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from "./ThemeToggle";
import CustomButton from "./CustomButton";
import CustomMenuItem from "./menuItem";
import FloatingMenu from "./FloatingMenu";
import MobileMenu from "./MobileMenu";
import LanguageSelector from "./LanguageSelector";
import { getMenuItems, getButtonText } from "../utils/menuItems";
import { useLanguage } from '../utils/languageContext';
import Image from 'next/image';
import Link from "next/link";

interface HeaderProps {
  onThemeToggle: () => void;
}

export default function Header({ onThemeToggle }: HeaderProps) {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language } = useLanguage();

  const currentMenuItems = getMenuItems(language);

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1000,
        willChange: 'transform',
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          height: "100%",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          {/* Logo */}
          <Link href="/">
            <Box
              sx={{
                position: 'relative',
                width: '40px',
                height: '40px',
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Image
                src="/icons/gycoding.svg"
                alt="GYCODING"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Link>

          {/* Menu items - Only show on desktop */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
              }}
            >
              {currentMenuItems.map((item, index) => (
                <CustomMenuItem
                  key={index}
                  item={item}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={setHoveredIndex}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <LanguageSelector />
          <ThemeToggle onToggle={onThemeToggle} />
          {isMobile ? (
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <CustomButton
              text={getButtonText(language, 'login')}
              link=""
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 600,
                px: 3,
                '&:hover': {
                  opacity: 0.9,
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            />
          )}
        </Box>
      </Box>

      {/* Floating menu for desktop */}
      {!isMobile && (
        <FloatingMenu
          items={currentMenuItems}
          activeIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      )}

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        menuItems={currentMenuItems}
        onClose={() => setMobileMenuOpen(false)}
      />
    </Box>
  );
}
