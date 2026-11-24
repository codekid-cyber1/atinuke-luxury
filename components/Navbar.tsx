'use client';

import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import BrandEmblem from './BrandEmblem';
import { buildGeneralWhatsAppUrl } from '@/lib/bag';
import type { CategoryFilter } from '@/lib/types';

interface NavbarProps {
  bagCount: number;
  mobileMenuOpen: boolean;
  onOpenMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onOpenBag: () => void;
  onSelectCategoryAndScroll: (category: CategoryFilter) => void;
}

export default function Navbar({
  bagCount,
  mobileMenuOpen,
  onOpenMobileMenu,
  onCloseMobileMenu,
  onOpenBag,
  onSelectCategoryAndScroll,
}: NavbarProps) {
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, onCloseMobileMenu]);

  const handleMobileNav = (category?: CategoryFilter, href?: string) => {
    onCloseMobileMenu();
    if (category) {
      onSelectCategoryAndScroll(category);
    } else if (href) {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="relative z-20 flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="#top"
          className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm"
        >
          <BrandEmblem />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-10 text-xs font-medium text-[#111111]/85"
        >
          <button
            type="button"
            onClick={() => onSelectCategoryAndScroll('All')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoryAndScroll('2-Piece Sets')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5"
          >
            2-Piece Sets
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoryAndScroll('Bespoke Fabrics')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5"
          >
            Bespoke
          </button>
          <a
            href="#showroom"
            className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0 py-1.5"
          >
            Showroom
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="text-xs font-medium text-[#111111] mr-1 sm:mr-3 whitespace-nowrap tabular-nums hover:text-[#C5A059] transition-colors py-2 px-1.5 cursor-pointer"
          >
            Bag ({bagCount})
          </button>

          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-[#C5A059] hover:bg-[#111111] hover:text-[#C5A059] transition-colors px-5 py-2 text-[11px] font-semibold tracking-wider uppercase text-[#111111] whitespace-nowrap shrink-0"
          >
            ORDER ON WHATSAPP
          </a>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobileMenu}
              className="fixed inset-0 bg-[#111111]/35 z-40 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 w-full max-w-xs h-[100dvh] flex flex-col justify-between bg-[#F5F0E6] border-l border-[#E2DACB] z-50 p-6 lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E2DACB]">
                  <BrandEmblem variant="drawer" />
                  <button
                    type="button"
                    onClick={onCloseMobileMenu}
                    aria-label="Close navigation menu"
                    className="inline-flex items-center justify-center w-11 h-11 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 pt-8">
                  <button
                    type="button"
                    onClick={() => handleMobileNav('All')}
                    className="text-left py-3 text-base font-medium text-[#111111] hover:text-[#C5A059] transition-colors border-b border-[#E2DACB]/60 cursor-pointer"
                  >
                    Collection
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav('2-Piece Sets')}
                    className="text-left py-3 text-base font-medium text-[#111111] hover:text-[#C5A059] transition-colors border-b border-[#E2DACB]/60 cursor-pointer"
                  >
                    2-Piece Sets
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav('Bespoke Fabrics')}
                    className="text-left py-3 text-base font-medium text-[#111111] hover:text-[#C5A059] transition-colors border-b border-[#E2DACB]/60 cursor-pointer"
                  >
                    Bespoke
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav(undefined, '#showroom')}
                    className="text-left py-3 text-base font-medium text-[#111111] hover:text-[#C5A059] transition-colors border-b border-[#E2DACB]/60 cursor-pointer"
                  >
                    Showroom
                  </button>
                </nav>
              </div>

              <div className="pt-6 border-t border-[#E2DACB] space-y-4">
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onCloseMobileMenu}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#C5A059] hover:bg-[#111111] hover:text-[#C5A059] transition-colors px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#111111]"
                >
                  Order on WhatsApp
                </a>
                <p className="text-[11px] text-[#5E5B55] leading-relaxed">
                  No. 75 Ibrahim Taiwo Rd, Ilorin, Kwara State.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
