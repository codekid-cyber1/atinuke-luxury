import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addBagItem,
  buildBagCheckoutWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  buildQuickOrderWhatsAppUrl,
  calculateBagCount,
  calculateBagSubtotal,
  filterProducts,
  formatNaira,
  getLineUnitPrice,
  getVariantMultiplier,
  removeBagItem,
  updateBagQuantity,
} from './bag';
import type { BagItem, ProductSpec } from './types';

const boubou: ProductSpec = {
  id: 'obsidian-gold-boubou',
  title: 'Obsidian & Gold Embroidered Boubou',
  category: 'Embroidered Boubous',
  unitPrice: 58000,
  isPerYard: false,
  variants: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
  defaultVariant: 'UK 10',
  alt: 'Obsidian & Gold Embroidered Boubou',
};

const laceFabric: ProductSpec = {
  id: 'royal-violet-lace',
  title: 'Royal Violet Guipure Lace (Per Yard)',
  category: 'Bespoke Fabrics',
  unitPrice: 18500,
  isPerYard: true,
  variants: ['2 Yds', '5 Yds', '10 Yds'],
  defaultVariant: '5 Yds',
  alt: 'Royal Violet Guipure Lace',
};

test('formatNaira formats Nigerian Naira cleanly with comma grouping', () => {
  assert.equal(formatNaira(58000), '₦58,000');
  assert.equal(formatNaira(18500), '₦18,500');
  assert.equal(formatNaira(0), '₦0');
});

test('getVariantMultiplier handles outfits vs fabric yardage', () => {
  assert.equal(getVariantMultiplier('UK 12', false), 1);
  assert.equal(getVariantMultiplier('2 Yds', true), 2);
  assert.equal(getVariantMultiplier('5 Yds', true), 5);
  assert.equal(getVariantMultiplier('10 Yds', true), 10);
});

test('getLineUnitPrice computes exact variant price for outfits and fabrics', () => {
  assert.equal(getLineUnitPrice(58000, 'UK 12', false), 58000);
  assert.equal(getLineUnitPrice(18500, '5 Yds', true), 92500);
});

test('addBagItem merges matching product+variant and separates distinct variants', () => {
  let bag: BagItem[] = [];
  bag = addBagItem(bag, boubou, 'UK 10');
  bag = addBagItem(bag, boubou, 'UK 10');
  bag = addBagItem(bag, boubou, 'UK 12');

  assert.equal(bag.length, 2);
  assert.equal(bag[0].quantity, 2);
  assert.equal(bag[1].quantity, 1);
  assert.equal(calculateBagCount(bag), 3);
  assert.equal(calculateBagSubtotal(bag), 174000);
});

test('updateBagQuantity and removeBagItem update totals and prune zero quantities', () => {
  let bag: BagItem[] = [];
  bag = addBagItem(bag, boubou, 'UK 10');
  bag = addBagItem(bag, laceFabric, '5 Yds');

  assert.equal(calculateBagSubtotal(bag), 58000 + 92500);

  bag = updateBagQuantity(bag, laceFabric.id, '5 Yds', 1);
  assert.equal(calculateBagCount(bag), 3);
  assert.equal(calculateBagSubtotal(bag), 58000 + 185000);

  bag = updateBagQuantity(bag, boubou.id, 'UK 10', -1);
  assert.equal(bag.length, 1);
  assert.equal(calculateBagSubtotal(bag), 185000);

  bag = removeBagItem(bag, laceFabric.id, '5 Yds');
  assert.equal(bag.length, 0);
  assert.equal(calculateBagSubtotal(bag), 0);
});

test('filterProducts filters by category and returns all items for All', () => {
  const sample = [
    boubou,
    laceFabric,
    { ...boubou, id: 'champagne-coord', category: '2-Piece Sets' as const },
  ];
  assert.equal(filterProducts(sample, 'All').length, 3);
  assert.equal(filterProducts(sample, 'Embroidered Boubous').length, 1);
  assert.equal(filterProducts(sample, 'Bespoke Fabrics').length, 1);
  assert.equal(filterProducts(sample, '2-Piece Sets').length, 1);
});

test('WhatsApp URL builders target +2348133780225 and encode order details', () => {
  assert.equal(
    buildGeneralWhatsAppUrl(),
    'https://wa.me/2348133780225?text=Hello%20Atinuke%20Luxury%2C%20I%20would%20like%20to%20place%20an%20order'
  );

  const quickUrl = buildQuickOrderWhatsAppUrl(laceFabric, '2 Yds');
  assert.ok(quickUrl.startsWith('https://wa.me/2348133780225?text='));
  const decodedQuick = decodeURIComponent(quickUrl.split('?text=')[1]);
  assert.match(decodedQuick, /Royal Violet Guipure Lace/);
  assert.match(decodedQuick, /2 Yds/);
  assert.match(decodedQuick, /₦37,000/);

  const bag = addBagItem(addBagItem([], boubou, 'UK 12'), laceFabric, '5 Yds');
  const checkoutUrl = buildBagCheckoutWhatsAppUrl(bag, 'Same-Day Ilorin Delivery');
  const decodedCheckout = decodeURIComponent(checkoutUrl.split('?text=')[1]);
  assert.match(decodedCheckout, /Obsidian & Gold Embroidered Boubou \(UK 12\) × 1/);
  assert.match(decodedCheckout, /Royal Violet Guipure Lace \(Per Yard\) \(5 Yds\) × 1/);
  assert.match(decodedCheckout, /Same-Day Ilorin Delivery/);
  assert.match(decodedCheckout, /₦150,500/);
});
