/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

interface UseGridDataOptions {
  url: string;
  resource: string;
  pageSize?: number;
}

interface UseGridDataResult {
  gridProps: {
    pagination: boolean;
    paginationPageSize: number;
    rowData?: any[];
  };
}

export const useGridData = ({
  url,
  resource,
  pageSize = 20,
}: UseGridDataOptions): UseGridDataResult => {
  const { data } = useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const token = sessionStorage.getItem('apitoken');
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  return {
    gridProps: {
      pagination: true,
      paginationPageSize: pageSize,
      rowData: data || [],
    },
  };
};
