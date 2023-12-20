import { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface FetchState {
  data: Item[];
  loading: boolean;
  error: Error | null;
}

const useFetch = (url: string): FetchState => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
