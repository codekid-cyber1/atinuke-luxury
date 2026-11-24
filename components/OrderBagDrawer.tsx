'use client';

import { useEffect } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  DELIVERY_OPTIONS,
  buildBagCheckoutWhatsAppUrl,
  calculateBagCount,
  calculateBagSubtotal,
  formatNaira,
  getLineTotal,
} from '@/lib/bag';
import type { BagItem, DeliveryOption } from '@/lib/types';

interface OrderBagDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  deliveryOption: DeliveryOption;
  onClose: () => void;
  onUpdateQuantity: (productId: string, variant: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string) => void;
  onDeliveryChange: (option: DeliveryOption) => void;
  onBrowseCollection: () => void;
}

export default function OrderBagDrawer({
  isOpen,
  items,
  deliveryOption,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onDeliveryChange,
  onBrowseCollection,
}: OrderBagDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const itemCount = calculateBagCount(items);
  const subtotal = calculateBagSubtotal(items);
  const whatsappCheckoutUrl = buildBagCheckoutWhatsAppUrl(items, deliveryOption);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/35 z-40"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Order Bag"
            className="fixed inset-y-0 right-0 w-full max-w-md h-[100dvh] flex flex-col bg-[#F5F0E6] border-l border-[#E2DACB] z-50"
          >
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#E2DACB]">
              <div>
                <h2 className="text-sm font-semibold tracking-wide uppercase text-[#111111]">
                  Order Bag ({itemCount})
                </h2>
                <p className="text-[11px] text-[#5E5B55] mt-0.5">
                  Confirm pieces &amp; send directly to Atinuke Luxury
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close order bag"
                className="inline-flex items-center justify-center w-10 h-10 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <p className="text-sm font-medium text-[#111111]">
                    Your order bag is empty
                  </p>
                  <p className="text-xs text-[#5E5B55] mt-2 max-w-[26ch] leading-relaxed">
                    Select a handcrafted boubou, 2-piece co-ord, or bespoke fabric from our lookbook.
                  </p>
                  <button
                    type="button"
                    onClick={onBrowseCollection}
                    className="mt-6 inline-flex items-center rounded-full bg-[#111111] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#111111] transition-colors px-6 py-2.5 text-xs font-medium tracking-wide cursor-pointer"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <ul className="divide-y divide-[#E2DACB]">
                    {items.map((item) => {
                      const lineTotal = getLineTotal(item);
                      return (
                        <li
                          key={`${item.productId}-${item.variant}`}
                          className="py-4 first:pt-0 flex flex-col gap-3"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-[#111111] leading-snug">
                                {item.title}
                              </p>
                              <p className="text-xs text-[#5E5B55] mt-1">
                                {item.isPerYard ? 'Yardage' : 'Size'}: {item.variant}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-[#111111] tabular-nums shrink-0">
                              {formatNaira(lineTotal)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#E2DACB]">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.productId, item.variant, -1)
                                }
                                aria-label={`Decrease quantity of ${item.title} (${item.variant})`}
                                className="inline-flex items-center justify-center w-9 h-9 text-[#111111] hover:bg-[#E2DACB]/50 transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span
                                aria-label={`Quantity of ${item.title} (${item.variant})`}
                                className="px-3 text-xs font-medium text-[#111111] tabular-nums"
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.productId, item.variant, 1)
                                }
                                aria-label={`Increase quantity of ${item.title} (${item.variant})`}
                                className="inline-flex items-center justify-center w-9 h-9 text-[#111111] hover:bg-[#E2DACB]/50 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.productId, item.variant)}
                              aria-label={`Remove ${item.title} (${item.variant})`}
                              className="inline-flex items-center gap-1.5 text-xs text-[#5E5B55] hover:text-[#111111] transition-colors py-1.5 px-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="pt-4 border-t border-[#E2DACB]">
                    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5E5B55] mb-3">
                      Delivery Preference
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Delivery Preference"
                      className="space-y-2"
                    >
                      {DELIVERY_OPTIONS.map((option) => {
                        const selected = deliveryOption === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => onDeliveryChange(option)}
                            className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors border flex items-center justify-between cursor-pointer ${
                              selected
                                ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#111111] font-medium'
                                : 'border-[#E2DACB] text-[#5E5B55] hover:border-[#111111]/40 hover:text-[#111111]'
                            }`}
                          >
                            <span>{option}</span>
                            {selected && (
                              <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
                                Selected
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-[#E2DACB] bg-[#F5F0E6] p-4 pb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#5E5B55]">
                  Estimated Subtotal
                </span>
                <span
                  data-testid="bag-subtotal"
                  className="text-base font-semibold text-[#111111] tabular-nums"
                >
                  {formatNaira(subtotal)}
                </span>
              </div>

              {items.length > 0 ? (
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#111111] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#111111] transition-colors py-3.5 px-6 text-xs font-semibold tracking-wider uppercase"
                >
                  Send Order on WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onBrowseCollection}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#111111] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#111111] transition-colors py-3.5 px-6 text-xs font-semibold tracking-wider uppercase cursor-pointer"
                >
                  Send Order on WhatsApp
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
