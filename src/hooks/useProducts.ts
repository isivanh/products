import { useRef, useState, useMemo, useCallback } from 'react'
import { searchProducts } from '../services/products'
import { Product } from '../types/product'
import { Filter, Paging, PagingResponse } from '../types/types'

export function useProducts (filter: Filter, paging: Paging, sort: boolean ) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(false);
  const [pagingResponse, setPagingResponse] = useState<PagingResponse>();

  const [error, setError] = useState<string>('')
  const previousSearch = useRef<{filter: Filter, paging: Paging}>({filter, paging})

  const getProducts = useCallback(async ( filter: Filter, paging: Paging ) => {
    if (filter === previousSearch.current.filter && paging === previousSearch.current.paging) return

    try {
      setLoading(true)
      setError('')
      previousSearch.current.filter = filter
      const newProducts = await searchProducts(filter, paging)
      setProducts(newProducts.products)
      setPagingResponse(newProducts.paging)
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedProducts = useMemo(() => {
    if (!products) return;
    return sort
      ? [...products].sort((a, b) => a.name.localeCompare(b.name))
      : products
  }, [sort, products])

  return { products: sortedProducts, pagingResponse, getProducts, loading, error }
}