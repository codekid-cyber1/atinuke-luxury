import type { BagItem, CategoryFilter, DeliveryOption, ProductSpec } from './types';

export const WHATSAPP_NUMBER = '2348133780225';

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  'Same-Day Ilorin Delivery',
  'Worldwide Shipping',
  'Pickup at No. 75 Ibrahim Taiwo Rd',
];

export const CATEGORY_TABS: CategoryFilter[] = [
  'All',
  '2-Piece Sets',
  'Embroidered Boubous',
  'Bespoke Fabrics',
];

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

export function getVariantMultiplier(variant: string, isPerYard: boolean): number {
  if (!isPerYard) {
    return 1;
  }
  const match = variant.match(/\d+/);
  if (!match) {
    return 1;
  }
  const yards = Number.parseInt(match[0], 10);
  return Number.isFinite(yards) && yards > 0 ? yards : 1;
}

export function getLineUnitPrice(
  unitPrice: number,
  variant: string,
  isPerYard: boolean
): number {
  return unitPrice * getVariantMultiplier(variant, isPerYard);
}

export function getLineTotal(item: Pick<BagItem, 'unitPrice' | 'variant' | 'isPerYard' | 'quantity'>): number {
  return getLineUnitPrice(item.unitPrice, item.variant, item.isPerYard) * item.quantity;
}

export function addBagItem(
  items: BagItem[],
  product: Pick<ProductSpec, 'id' | 'title' | 'category' | 'unitPrice' | 'isPerYard'>,
  variant: string
): BagItem[] {
  const existingIndex = items.findIndex(
    (entry) => entry.productId === product.id && entry.variant === variant
  );

  if (existingIndex >= 0) {
    return items.map((entry, idx) =>
      idx === existingIndex ? { ...entry, quantity: entry.quantity + 1 } : entry
    );
  }

  return [
    ...items,
    {
      productId: product.id,
      title: product.title,
      category: product.category,
      unitPrice: product.unitPrice,
      isPerYard: product.isPerYard,
      variant,
      quantity: 1,
    },
  ];
}

export function updateBagQuantity(
  items: BagItem[],
  productId: string,
  variant: string,
  delta: number
): BagItem[] {
  return items
    .map((entry) => {
      if (entry.productId === productId && entry.variant === variant) {
        return { ...entry, quantity: entry.quantity + delta };
      }
      return entry;
    })
    .filter((entry) => entry.quantity > 0);
}

export function removeBagItem(
  items: BagItem[],
  productId: string,
  variant: string
): BagItem[] {
  return items.filter(
    (entry) => !(entry.productId === productId && entry.variant === variant)
  );
}

export function calculateBagCount(items: BagItem[]): number {
  return items.reduce((sum, entry) => sum + entry.quantity, 0);
}

export function calculateBagSubtotal(items: BagItem[]): number {
  return items.reduce((sum, entry) => sum + getLineTotal(entry), 0);
}

export function filterProducts<T extends { category: string }>(
  products: T[],
  activeCategory: CategoryFilter
): T[] {
  if (activeCategory === 'All') {
    return products;
  }
  return products.filter((item) => item.category === activeCategory);
}

export function buildGeneralWhatsAppUrl(): string {
  const message = 'Hello Atinuke Luxury, I would like to place an order';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildBespokeBookingWhatsAppUrl(): string {
  const message =
    'Hello Atinuke Luxury, I would like to book a bespoke fitting at No. 75 Ibrahim Taiwo Rd, Ilorin.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildQuickOrderWhatsAppUrl(
  product: Pick<ProductSpec, 'title' | 'unitPrice' | 'isPerYard'>,
  variant: string
): string {
  const total = getLineUnitPrice(product.unitPrice, variant, product.isPerYard);
  const message = [
    'Hello Atinuke Luxury, I would like to order:',
    `• ${product.title} (${variant}) — ${formatNaira(total)}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildBagCheckoutWhatsAppUrl(
  items: BagItem[],
  deliveryOption: DeliveryOption
): string {
  if (items.length === 0) {
    return buildGeneralWhatsAppUrl();
  }

  const lines = items.map((item) => {
    const lineTotal = getLineTotal(item);
    return `• ${item.title} (${item.variant}) × ${item.quantity} — ${formatNaira(lineTotal)}`;
  });

  const subtotal = calculateBagSubtotal(items);
  const message = [
    'Hello Atinuke Luxury, I would like to place an order:',
    '',
    ...lines,
    '',
    `Delivery Preference: ${deliveryOption}`,
    `Estimated Subtotal: ${formatNaira(subtotal)}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
