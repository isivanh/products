import {describe, expect, test} from '@jest/globals';
import {searchProducts} from '../src/services/products';

global.fetch = jest.fn();

describe('service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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

    // Mock fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ products: mockProducts }),
    });

    const result = await searchProducts('1');
    expect(result).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});