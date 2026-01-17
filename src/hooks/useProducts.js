import { useState, useEffect } from 'react';

export const useProducts = (page = 1, limit = 8) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data.products);
          setPagination(data.data.pagination);
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { products, pagination, loading, error };
};