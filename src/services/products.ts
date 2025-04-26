import {Product} from '../models/product'

const API_KEY = 'ff236fbd608a479b8d2025a3791bb848'
const baseUrl = 'https://services.retailcompass.com/api/pricing/v1/products';

export const searchProducts = async ( page: string = '2' ): Promise<Array<Product>> => {
  // if (page === '') return null;

  try {
    const url = new URL(baseUrl);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('page', page);
    const options = {
      method: 'GET',
    };
    const response = await fetch(url, options);
    const json = await response.json();

    const products: Array<Product> = json.products;
    console.log(products);
    return products;
  } catch (e) {
    throw new Error('Error searching movies');
  }
}