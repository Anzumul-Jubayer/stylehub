import { useState, useEffect } from 'react';

export const useTrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/products/trending');
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.error || 'Failed to fetch trending products');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching trending products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return { products, loading, error };
};