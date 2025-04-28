import { Product } from "../types/product";
import {
  Filter,
  Paging,
  PagingResponse,
  SearchProductsParams,
} from "../types/types";

const API_KEY = "ff236fbd608a479b8d2025a3791bb848";
const baseUrl = "https://services.retailcompass.com/api/pricing/v1/products";

export const searchProducts = async (
  filters: Filter,
  paging: Paging,
): Promise<{ products: Array<Product>; paging: PagingResponse }> => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.append("apikey", API_KEY);

    const body: SearchProductsParams = {
      filters,
      paging,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url.toString(), options);
    const json = await response.json();

    const products: Array<Product> = json.products;
    const pagingResponse: PagingResponse = json.paging;

    return { products, paging: pagingResponse };
  } catch {
    throw new Error("Error searching products");
  }
};
