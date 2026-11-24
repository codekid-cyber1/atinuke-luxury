import Image from 'next/image';
import { LOGO_EMBLEM_SRC } from '@/lib/catalog';

interface BrandEmblemProps {
  variant?: 'header' | 'drawer' | 'footer';
}

export default function BrandEmblem({ variant = 'header' }: BrandEmblemProps) {
  const imageClass =
    variant === 'drawer'
      ? 'w-14 h-14 scale-[1.12]'
      : variant === 'footer'
        ? 'w-20 h-20 sm:w-24 sm:h-24 scale-[1.08]'
        : 'w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] scale-[1.14] -my-1.5';

  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0">
      <Image
        src={LOGO_EMBLEM_SRC}
        alt="Atinuke's Luxury crest"
        width={128}
        height={128}
        priority
        referrerPolicy="no-referrer"
        className={`${imageClass} object-contain brightness-90 contrast-125 saturate-125 shrink-0`}
      />
      <span className="text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] font-semibold uppercase text-[#111111] whitespace-nowrap">
        ATINUKE LUXURY
      </span>
    </span>
  );
}
