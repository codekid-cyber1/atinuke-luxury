'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import { HERO_SUBJECT_IMAGE } from '@/lib/catalog';
import type { CategoryFilter } from '@/lib/types';

interface HeroSectionProps {
  bagCount: number;
  mobileMenuOpen: boolean;
  onOpenMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onOpenBag: () => void;
  onSelectCategoryAndScroll: (category: CategoryFilter) => void;
}

export default function HeroSection({
  bagCount,
  mobileMenuOpen,
  onOpenMobileMenu,
  onCloseMobileMenu,
  onOpenBag,
  onSelectCategoryAndScroll,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="min-h-[100dvh] flex flex-col justify-between px-6 sm:px-12 py-6 bg-[#F5F0E6] relative overflow-hidden"
    >
      <Navbar
        bagCount={bagCount}
        mobileMenuOpen={mobileMenuOpen}
        onOpenMobileMenu={onOpenMobileMenu}
        onCloseMobileMenu={onCloseMobileMenu}
        onOpenBag={onOpenBag}
        onSelectCategoryAndScroll={onSelectCategoryAndScroll}
      />

      <div className="relative flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-between pt-4 sm:pt-8 gap-4 lg:gap-0">
        <div className="relative z-20 w-full lg:w-auto flex flex-col md:flex-row lg:block items-start justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs sm:max-w-[440px] lg:max-w-[330px] xl:max-w-[440px] mt-2 sm:mt-6 lg:mt-8 self-start"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[36px] xl:text-5xl font-semibold tracking-tight text-[#111111] leading-[1.08] [text-wrap:balance]">
              Statement wear,
              <br className="hidden sm:inline" /> made to stand out.
            </h1>
            <p className="text-xs sm:text-sm text-[#5E5B55] mt-3 leading-relaxed max-w-xs sm:max-w-sm lg:max-w-[310px] xl:max-w-sm">
              Handcrafted 2-piece sets, embroidered boubous, and bespoke fabrics tailored in Ilorin.
            </p>
            <button
              type="button"
              onClick={() => onSelectCategoryAndScroll('All')}
              className="mt-6 inline-flex items-center rounded-full bg-[#111111] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#111111] transition-colors px-6 py-2.5 text-xs font-medium tracking-wide whitespace-nowrap cursor-pointer"
            >
              Explore Collection
            </button>
          </motion.div>

          <p className="hidden md:block lg:hidden max-w-[200px] text-right text-xs font-medium text-[#111111] leading-snug mt-6 shrink-0">
            Designed &amp; made in Nigeria for women who stand out
          </p>
        </div>

        <div className="pointer-events-none select-none z-10 mt-2 md:mt-4 lg:mt-0 lg:absolute lg:inset-0 flex items-center justify-center">
          <div className="bg-[#F5F0E6] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Image
              src={HERO_SUBJECT_IMAGE}
              alt="Poised Nigerian woman wearing an Atinuke Luxury obsidian black velvet and sheer organza couture boubou with 3D champagne gold embroidery"
              priority
              referrerPolicy="no-referrer"
              className="mx-auto my-auto h-[48vh] sm:h-[52vh] md:h-[54vh] lg:h-[76vh] xl:h-[85vh] w-auto object-contain opacity-100 mix-blend-multiply contrast-105 brightness-105"
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 hidden lg:block max-w-[210px] text-right text-xs font-medium text-[#111111] leading-snug mt-8"
        >
          Designed &amp; made in Nigeria for women who stand out
        </motion.p>
      </div>

      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 pt-6">
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#111111] whitespace-nowrap">
          <span>2-PIECE SETS</span>
          <span className="text-[#C5A059]" aria-hidden="true">
            •
          </span>
          <span>BOUBOUS</span>
          <span className="text-[#C5A059]" aria-hidden="true">
            •
          </span>
          <span>BESPOKE</span>
          <span className="text-[#C5A059]" aria-hidden="true">
            •
          </span>
          <span>FABRICS</span>
        </div>

        <p className="text-[11px] text-[#5E5B55] sm:text-right max-w-[230px] leading-relaxed">
          No. 75 Ibrahim Taiwo Rd, Ilorin. Worldwide delivery available.
        </p>
      </div>
    </section>
  );
}
