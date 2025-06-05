/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridApi } from 'ag-grid-community';
import { QueryClient } from '@tanstack/react-query';

interface CreateClientSideDatasourceOptions {
  url: string;
  resource: string;
  pageSize?: number;
}

export async function createClientSideDatasource(
  gridApi: GridApi,
  { url, resource }: CreateClientSideDatasourceOptions
): Promise<void> {
  const token = sessionStorage.getItem('apitoken');
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: [resource],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  return data.rows || data || [];
}
