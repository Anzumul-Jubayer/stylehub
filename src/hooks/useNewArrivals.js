import { useState, useEffect } from 'react';

export const useNewArrivals = (page = 1, limit = 12) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/new-arrivals?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data.products);
          setPagination(data.data.pagination);
        } else {
          setError(data.error || 'Failed to fetch new arrivals');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching new arrivals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, [page, limit]);

  return { products, pagination, loading, error };
};