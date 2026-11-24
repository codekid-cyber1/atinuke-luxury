export type ProductCategory =
  | '2-Piece Sets'
  | 'Embroidered Boubous'
  | 'Bespoke Fabrics';

export type CategoryFilter = 'All' | ProductCategory;

export type DeliveryOption =
  | 'Same-Day Ilorin Delivery'
  | 'Worldwide Shipping'
  | 'Pickup at No. 75 Ibrahim Taiwo Rd';

export interface ProductSpec {
  id: string;
  title: string;
  category: ProductCategory;
  unitPrice: number;
  isPerYard: boolean;
  variants: string[];
  defaultVariant: string;
  alt: string;
}

export interface BagItem {
  productId: string;
  title: string;
  category: ProductCategory;
  unitPrice: number;
  isPerYard: boolean;
  variant: string;
  quantity: number;
}
