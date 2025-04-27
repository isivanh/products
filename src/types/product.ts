export interface Product{
  productId: number,
  storeId: number,
  storeName: string,
  name: string,
  sku: string,
  brand: string,
  url: string,
  imageUrl: string,
  status: string,
  created: Date,
  updated: Date,
  extracted: Date,
  prices: Prices,
  categories: Array<Category>,
  competitors: Array<Competitors>,
}

export interface Prices{
  lowest: number,
  offerPrice: number,
  cardPrice: number,
  normalPrice: number,
}

export interface Category{
  id: number,
  categoryIdPath: string,
  fullPath: string,
}

export interface Competitors{
  products: Array<Product>,
}