import { useState, useEffect } from 'react';

export const useSpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/offers');
        const data = await response.json();

        if (data.success) {
          setOffers(data.data);
        } else {
          setError(data.error || 'Failed to fetch special offers');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching special offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialOffers();
  }, []);

  return { offers, loading, error };
};