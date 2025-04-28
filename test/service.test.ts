import { describe, expect, test } from "@jest/globals";
import { searchProducts } from "../src/services/products";
import { Filter, Paging, PagingResponse } from "../src/types/types";

global.fetch = jest.fn();

describe("service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const filter: Filter = { status: ["AVAILABLE"], brand: "Sony" };
  const paging: Paging = { page: 0, size: 20 };

  test("get products", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Test Product",
        description: "Test Description",
        price: 99.99,
        brand: "Test Brand",
        category: "Test Category",
        prices: {
          normalPrice: 100,
          offerPrice: 90,
          lowest: 80,
        },
        storeName: "Test Store",
        productId: "1",
        sku: "SKU1",
      },
    ];

    const mockPaging: PagingResponse = {
      size: 20,
      total: 1,
      pages: 1,
      currentPage: 0,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ products: mockProducts, paging: mockPaging }),
    });

    const result = await searchProducts(filter, paging);
    expect(result).toEqual({ products: mockProducts, paging: mockPaging });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
