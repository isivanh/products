import { useRef, useState, useMemo, useCallback } from 'react'
import { searchProducts } from '../services/products'
import { Product } from '../models/product'

export function useProducts (search: string, sort: boolean ) {
  const [products, setProducts] = useState<Array<Product>>([])
  const [loading, setLoading] = useState(false)

  const [, setError] = useState<string>('')
  const previousSearch = useRef(search)

  const getProducts = useCallback(async ( search: string ) => {
    // if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError('')
      previousSearch.current = search
      const newProducts = await searchProducts()
      console.log(newProducts);
      setProducts(newProducts)
    } catch (error) {
      console.error('Error:', error);
      //setError(error)
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

  return { products: sortedProducts, getProducts, loading }
}