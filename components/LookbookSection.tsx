'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import {
  CATEGORY_TABS,
  buildQuickOrderWhatsAppUrl,
  filterProducts,
  formatNaira,
} from '@/lib/bag';
import { CATALOG_PRODUCTS, type CatalogProduct } from '@/lib/catalog';
import type { CategoryFilter } from '@/lib/types';

interface LookbookSectionProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onAddToBag: (product: CatalogProduct, variant: string) => void;
}

export default function LookbookSection({
  activeCategory,
  onCategoryChange,
  onAddToBag,
}: LookbookSectionProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() =>
    Object.fromEntries(CATALOG_PRODUCTS.map((item) => [item.id, item.defaultVariant]))
  );
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const visibleProducts = filterProducts(CATALOG_PRODUCTS, activeCategory);

  const handleVariantSelect = (productId: string, variant: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  const handleAdd = (product: CatalogProduct, variant: string) => {
    onAddToBag(product, variant);
    setRecentlyAddedId(`${product.id}:${variant}`);
    window.setTimeout(() => {
      setRecentlyAddedId((current) =>
        current === `${product.id}:${variant}` ? null : current
      );
    }, 1200);
  };

  return (
    <section
      id="collection"
      aria-labelledby="lookbook-heading"
      className="py-24 px-6 sm:px-12 border-t border-[#E2DACB] bg-[#F5F0E6]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5E5B55]">
            Atelier Lookbook
          </p>
          <h2
            id="lookbook-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111] mt-2"
          >
            Ready-to-Wear &amp; Bespoke Textiles
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Filter collection by category"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-1"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onCategoryChange(tab)}
                className={`whitespace-nowrap shrink-0 pb-2 text-xs tracking-wide transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#C5A059] text-[#111111] font-semibold'
                    : 'border-transparent text-[#5E5B55] hover:text-[#111111] font-medium'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div
        data-testid="lookbook-grid"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-7 sm:gap-y-14"
      >
        {visibleProducts.map((product) => {
          const activeVariant = selectedVariants[product.id] ?? product.defaultVariant;
          const isJustAdded = recentlyAddedId === `${product.id}:${activeVariant}`;

          return (
            <motion.article
              key={product.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE5D8]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  referrerPolicy="no-referrer"
                  className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                    product.imageFocus === 'top' ? 'object-top' : 'object-center'
                  }`}
                />
              </div>

              <div className="pt-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-sm sm:text-[15px] font-medium text-[#111111] leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E5B55] tabular-nums mt-1">
                    {product.isPerYard
                      ? `${formatNaira(product.unitPrice)} / yd`
                      : formatNaira(product.unitPrice)}
                  </p>
                </div>

                <div className="mt-3">
                  <div
                    role="group"
                    aria-label={`Select size or yardage for ${product.title}`}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1"
                  >
                    {product.variants.map((variant) => {
                      const selected = activeVariant === variant;
                      return (
                        <button
                          key={variant}
                          type="button"
                          onClick={() => handleVariantSelect(product.id, variant)}
                          aria-pressed={selected}
                          aria-label={`${variant} for ${product.title}`}
                          className={`py-1.5 text-[11px] tracking-wide whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                            selected
                              ? 'border-[#C5A059] text-[#111111] font-semibold'
                              : 'border-transparent text-[#5E5B55] hover:text-[#111111]'
                          }`}
                        >
                          {variant}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#E2DACB]/70">
                    <button
                      type="button"
                      onClick={() => handleAdd(product, activeVariant)}
                      aria-label={`Add ${product.title} (${activeVariant}) to bag`}
                      className="text-xs font-medium text-[#111111] hover:text-[#C5A059] transition-colors py-1.5 whitespace-nowrap cursor-pointer"
                    >
                      {isJustAdded ? 'Added to Bag' : 'Add to Bag'}
                    </button>

                    <a
                      href={buildQuickOrderWhatsAppUrl(product, activeVariant)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Order ${product.title} (${activeVariant}) directly on WhatsApp`}
                      title="Quick order on WhatsApp"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[#111111] hover:bg-[#C5A059]/20 hover:text-[#111111] transition-colors shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
