import type { StaticImageData } from 'next/image';
import type { ProductSpec } from './types';

import heroGoldBoubouImg from '@/src/assets/images/hero_couture_boubou_1795478736612.jpg';
import obsidianGoldBoubouImg from '@/src/assets/images/obsidian_gold_boubou_1795476790297.jpg';
import emeraldSilkMaxiImg from '@/src/assets/images/emerald_silk_maxi_1795476791022.jpg';
import champagneSilkCoordImg from '@/src/assets/images/champagne_silk_coord_1795476792134.jpg';
import blackTailoredSetImg from '@/src/assets/images/black_tailored_set_1795476792497.jpg';
import crimsonPleatedDressImg from '@/src/assets/images/crimson_pleated_dress_1795476792801.jpg';
import printedResortCoordImg from '@/src/assets/images/printed_resort_coord_1795476792803.jpg';
import violetGuipureLaceImg from '@/src/assets/images/violet_guipure_lace_1795476792498.jpg';
import goldWovenDamaskImg from '@/src/assets/images/gold_woven_damask_1795476793464.jpg';

export const HERO_SUBJECT_IMAGE = heroGoldBoubouImg;

export const LOGO_EMBLEM_SRC =
  '/assets/aistudio/fc12b846-33ef-4c17-93f6-66df80a7158b-removebg-preview_eae72301.png';

export interface CatalogProduct extends ProductSpec {
  image: StaticImageData;
  imageFocus: 'top' | 'center';
}

const OUTFIT_SIZES = ['UK 8', 'UK 10', 'UK 12', 'UK 14'];
const FABRIC_YARDS = ['2 Yds', '5 Yds', '10 Yds'];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'obsidian-gold-embroidered-boubou',
    title: 'Obsidian & Gold Embroidered Boubou',
    category: 'Embroidered Boubous',
    unitPrice: 58000,
    isPerYard: false,
    variants: OUTFIT_SIZES,
    defaultVariant: 'UK 10',
    image: obsidianGoldBoubouImg,
    imageFocus: 'top',
    alt: 'Poised Nigerian woman wearing an obsidian black silk boubou richly detailed with champagne gold embroidery',
  },
  {
    id: 'emerald-silk-statement-maxi',
    title: 'Emerald Silk Statement Maxi',
    category: 'Embroidered Boubous',
    unitPrice: 54000,
    isPerYard: false,
    variants: OUTFIT_SIZES,
    defaultVariant: 'UK 10',
    image: emeraldSilkMaxiImg,
    imageFocus: 'top',
    alt: 'Poised Nigerian woman wearing a flowing emerald green silk statement maxi boubou dress',
  },
  {
    id: 'champagne-silk-2piece-coord',
    title: 'Champagne Silk 2-Piece Co-ord',
    category: '2-Piece Sets',
    unitPrice: 45000,
    isPerYard: false,
    variants: OUTFIT_SIZES,
    defaultVariant: 'UK 10',
    image: champagneSilkCoordImg,
    imageFocus: 'top',
    alt: 'Poised Nigerian woman wearing a tailored champagne beige silk two-piece tunic and wide-leg trouser set',
  },
  {
    id: 'all-black-tailored-2piece-set',
    title: 'All-Black Tailored 2-Piece Set',
    category: '2-Piece Sets',
    unitPrice: 46000,
    isPerYard: false,
    variants: OUTFIT_SIZES,
    defaultVariant: 'UK 10',
    image: blackTailoredSetImg,
    imageFocus: 'top',
    alt: 'Poised Nigerian woman wearing a sleek all-black tailored two-piece tunic and trouser set',
  },
  {
    id: 'crimson-pleated-occasion-dress',
    title: 'Crimson Pleated Occasion Dress',
    category: 'Embroidered Boubous',
    unitPrice: 49500,
    isPerYard: false,
    variants: OUTFIT_SIZES,
    defaultVariant: 'UK 10',
    image: crimsonPleatedDressImg,
    imageFocus: 'top',
    alt: 'Poised Nigerian woman wearing a bold crimson red pleated flowing occasion dress',
  },
  {
    id: 'vibrant-printed-resort-coord',
    title: 'Vibrant Printed Resort Co-ord',
    category: '2-Piece Sets',
    unitPrice: 42000,
    isPerYard: false,
    variants: OUTFIT_SIZES,
    defaultVariant: 'UK 10',
    image: printedResortCoordImg,
    imageFocus: 'top',
    alt: 'Poised Nigerian woman wearing a vibrant patterned silk resort shirt and trouser two-piece co-ord',
  },
  {
    id: 'royal-violet-guipure-lace',
    title: 'Royal Violet Guipure Lace (Per Yard)',
    category: 'Bespoke Fabrics',
    unitPrice: 18500,
    isPerYard: true,
    variants: FABRIC_YARDS,
    defaultVariant: '5 Yds',
    image: violetGuipureLaceImg,
    imageFocus: 'center',
    alt: 'Close-up of rich royal violet purple textured guipure lace fabric',
  },
  {
    id: 'champagne-gold-woven-damask',
    title: 'Champagne Gold Woven Damask (Per Yard)',
    category: 'Bespoke Fabrics',
    unitPrice: 24000,
    isPerYard: true,
    variants: FABRIC_YARDS,
    defaultVariant: '5 Yds',
    image: goldWovenDamaskImg,
    imageFocus: 'center',
    alt: 'Close-up of shimmering champagne gold woven jacquard damask fabric',
  },
];
