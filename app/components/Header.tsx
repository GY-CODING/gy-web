import { Box, useTheme, IconButton, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from "./ThemeToggle";
import CustomButton from "./CustomButton";
import CustomMenuItem from "./menuItem";
import FloatingMenu from "./FloatingMenu";
import MobileMenu from "./MobileMenu";
import { menuItems } from "../utils/menuItems";
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
            </Box></Link>

          {/* Menu items - Only show on desktop */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
              }}
            >
              {menuItems.map((item, index) => (
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
          <ThemeToggle onToggle={onThemeToggle} />
          {isMobile ? (
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <CustomButton
                text="Log In"
                link=""
                sx={{
                  backgroundColor: 'transparent',
                  border: '2px solid',
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(140, 84, 255, 0.04)'
                      : 'rgba(140, 84, 255, 0.08)',
                  }
                }}
              />
              <CustomButton
                text="Contact"
                link=""
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  border: '2px solid',
                  borderColor: theme.palette.secondary.main,
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.light,
                    borderColor: theme.palette.secondary.light,
                  }
                }}
              />
            </>
          )}
        </Box>
      </Box>

      {/* Floating menu for desktop */}
      {!isMobile && (
        <FloatingMenu
          items={menuItems}
          activeIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      )}

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobile && mobileMenuOpen}
        menuItems={menuItems}
        onClose={() => setMobileMenuOpen(false)}
      />
    </Box>
  );
}
