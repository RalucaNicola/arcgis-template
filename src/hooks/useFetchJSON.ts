import useSWR from 'swr';

type RequestType = RequestInfo | URL;

async function fetcher(args: RequestType) {
  const result = await fetch(args);
  return result.json();
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
