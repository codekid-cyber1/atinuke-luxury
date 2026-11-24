'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import HeroSection from './HeroSection';
import LookbookSection from './LookbookSection';
import OrderBagDrawer from './OrderBagDrawer';
import ShowroomFooter from './ShowroomFooter';
import {
  addBagItem,
  calculateBagCount,
  removeBagItem,
  updateBagQuantity,
} from '@/lib/bag';
import type { CatalogProduct } from '@/lib/catalog';
import type { BagItem, CategoryFilter, DeliveryOption } from '@/lib/types';

const BAG_STORAGE_KEY = 'atinuke_luxury_order_bag_v1';
const BAG_SYNC_EVENT = 'atinuke-bag-sync';
const EMPTY_BAG: BagItem[] = [];

let cachedRawBag: string | null = null;
let cachedParsedBag: BagItem[] = EMPTY_BAG;

function readBagSnapshot(): BagItem[] {
  if (typeof window === 'undefined') return EMPTY_BAG;
  try {
    const raw = window.localStorage.getItem(BAG_STORAGE_KEY);
    if (raw === cachedRawBag) return cachedParsedBag;
    cachedRawBag = raw;
    if (!raw) {
      cachedParsedBag = EMPTY_BAG;
      return cachedParsedBag;
    }
    const parsed = JSON.parse(raw);
    cachedParsedBag = Array.isArray(parsed) ? parsed : EMPTY_BAG;
    return cachedParsedBag;
  } catch {
    return EMPTY_BAG;
  }
}

function getServerBagSnapshot(): BagItem[] {
  return EMPTY_BAG;
}

function subscribeBagStore(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener(BAG_SYNC_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(BAG_SYNC_EVENT, handler);
  };
}

function writeBagStore(nextItems: BagItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = JSON.stringify(nextItems);
    cachedRawBag = raw;
    cachedParsedBag = nextItems;
    window.localStorage.setItem(BAG_STORAGE_KEY, raw);
    window.dispatchEvent(new Event(BAG_SYNC_EVENT));
  } catch {
    // Ignore storage write errors
  }
}

export default function StorefrontClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const bagItems = useSyncExternalStore(
    subscribeBagStore,
    readBagSnapshot,
    getServerBagSnapshot
  );
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>(
    'Same-Day Ilorin Delivery'
  );
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateBag = useCallback(
    (updater: (current: BagItem[]) => BagItem[]) => {
      const current = readBagSnapshot();
      writeBagStore(updater(current));
    },
    []
  );

  const scrollToCollection = () => {
    const target = document.getElementById('collection');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategoryAndScroll = (category: CategoryFilter) => {
    setActiveCategory(category);
    scrollToCollection();
  };

  const handleAddToBag = (product: CatalogProduct, variant: string) => {
    updateBag((prev) => addBagItem(prev, product, variant));
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (
    productId: string,
    variant: string,
    delta: number
  ) => {
    updateBag((prev) => updateBagQuantity(prev, productId, variant, delta));
  };

  const handleRemoveItem = (productId: string, variant: string) => {
    updateBag((prev) => removeBagItem(prev, productId, variant));
  };

  const handleBrowseFromEmptyBag = () => {
    setIsBagOpen(false);
    scrollToCollection();
  };

  const bagCount = calculateBagCount(bagItems);

  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#111111]">
      <HeroSection
        bagCount={bagCount}
        mobileMenuOpen={isMobileMenuOpen}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        onOpenBag={() => setIsBagOpen(true)}
        onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
      />

      <LookbookSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddToBag={handleAddToBag}
      />

      <ShowroomFooter />

      <OrderBagDrawer
        isOpen={isBagOpen}
        items={bagItems}
        deliveryOption={deliveryOption}
        onClose={() => setIsBagOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onDeliveryChange={setDeliveryOption}
        onBrowseCollection={handleBrowseFromEmptyBag}
      />
    </main>
  );
}
