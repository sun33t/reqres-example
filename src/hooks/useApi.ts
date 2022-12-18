import { ApiResponse, User } from '@types';
import fetch from 'cross-fetch';
import { useEffect, useState } from 'react';

export default function useApi(endpoint: string, query: string) {
  const baseURL = 'https://reqres.in/api';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        await fetch(`${baseURL}/${endpoint}?${query}`)
          .then((res) => res.json())
          .then((res: ApiResponse) => {
            setUsers(res?.data);
            setTotalPages(res?.total_pages);
            setIsLoading(false);
          });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    makeApiCall();
  }, [endpoint, query]);

  return { isLoading, error, users, totalPages };
}
