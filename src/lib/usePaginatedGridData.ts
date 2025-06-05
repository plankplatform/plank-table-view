/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';

interface UsePaginatedGridDataOptions {
  url: string;
  resource: string;
  pageSize?: number;
}

interface UsePaginatedGridDataResult {
  gridProps: {
    rowModelType: 'infinite';
    pagination: boolean;
    paginationPageSize: number;
    cacheBlockSize: number;
    datasource: any;
  };
}

const AG_GRID_OPERATOR_MAP: Record<string, string> = {
  equals: '',
  notEqual: 'ne',
  lessThan: 'lt',
  lessThanOrEqual: 'lte',
  greaterThan: 'gt',
  greaterThanOrEqual: 'gte',
  contains: 'contains',
  notContains: 'not_contains',
  startsWith: 'starts_with',
  endsWith: 'ends_with',
  blank: 'null',
  notBlank: 'not_null',
};

export const usePaginatedGridData = ({
  url,
  resource,
  pageSize = 20,
}: UsePaginatedGridDataOptions): UsePaginatedGridDataResult => {
  const queryClient = new QueryClient();

  const datasource = {
    getRows: async (params: any) => {
      const { startRow, endRow, sortModel, filterModel } = params;
      const limit = endRow - startRow;
      const offset = startRow;
      const token = sessionStorage.getItem('apitoken');

      const sort = sortModel.map((s: any) => `${s.colId}:${s.sort}`).join(',');

      const filter = Object.entries(filterModel)
        .flatMap(([field, conf]: any) => {
          const operator = AG_GRID_OPERATOR_MAP[conf.type] ?? '';
          const value = encodeURIComponent(conf.filter ?? true);
          const key = operator ? `filter[${field}][${operator}]` : `filter[${field}]`;
          return [`${key}=${value}`];
        })
        .join('&');

      const fullUrl =
        `${url}?offset=${offset}&limit=${limit}` +
        (sort ? `&sort=${sort}` : '') +
        (filter ? `&${filter}` : '');

      try {
        const data = await queryClient.fetchQuery({
          queryKey: [resource, { offset, limit, sort, filter }],
          queryFn: async () => {
            const res = await fetch(fullUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          },
        });

        const rows = data.rows || [];
        const lastRow = data.lastRow ?? rows.length;
        params.successCallback(rows, lastRow);
      } catch (err: any) {
        console.error('Fetch error:', err.message || err);
        params.failCallback();
      }
    },
  };

  return {
    gridProps: {
      rowModelType: 'infinite',
      pagination: true,
      paginationPageSize: pageSize,
      cacheBlockSize: pageSize,
      datasource,
    },
  };
};
