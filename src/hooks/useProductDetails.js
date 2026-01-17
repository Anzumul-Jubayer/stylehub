import { useState, useEffect } from 'react';

export const useProductDetails = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error || 'Failed to fetch product details');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return { product, loading, error };
};