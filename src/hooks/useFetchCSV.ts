import useSWR from 'swr';
import { csv } from 'd3';

async function fetcher(args: string) {
  const result = await csv(args);
  return result;
}

export function useFetchData(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  return {
    data,
    error,
    isLoading
  };
}
