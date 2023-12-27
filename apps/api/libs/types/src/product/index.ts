import { IBase } from '../base';

interface VariationOption {
  name: string;
  value: string;
}

interface Variation {
  name: string;
  options: VariationOption[];
}

export enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

export interface IProduct extends IBase {
  name: string;
  description: string;
  slug: string;
  // categories: Category[];
  tags?: string[];
  variations: Variation[];
  sku: string;
  countInStock: number;
  price: number;
  sale_price?: number;
  // dimensions?: Dimension;
  // brand: Brand;
  image?: string;
  gallery?: string[];
  reviews?: string[];
  status: ProductStatus;
}
