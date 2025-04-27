import {describe, expect, test} from '@jest/globals';
import {searchProducts} from '../src/services/products';
import { Filter, Paging } from '../src/types/types';

global.fetch = jest.fn();

describe('service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const filter: Filter = {status: ['AVAILABLE'], brand: "Sony"};
  const paging: Paging = {page: 0, size: 20}

  test('get products', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        brand: 'Test Brand',
        category: 'Test Category'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ products: mockProducts }),
    });

    const result = await searchProducts(filter, paging);
    expect(result).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});