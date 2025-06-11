/* eslint-disable @typescript-eslint/no-explicit-any */
import { IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { QueryClient } from '@tanstack/react-query';

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

interface CreateServerSideDatasourceOptions {
  url: string;
  resource: string;
  pageSize?: number;
}

export function makeDatasource({
  url,
  resource,
  pageSize = 20,
}: CreateServerSideDatasourceOptions): IServerSideDatasource {
  const queryClient = new QueryClient();

  return {
    getRows: async (params: IServerSideGetRowsParams) => {
      const { filterModel, sortModel } = params.request;
      const offset = params.request.startRow ?? 0;
      const limit = (params.request.endRow ?? offset + pageSize) - offset;
      const token = sessionStorage.getItem('apitoken');

      const sort = sortModel.map((s) => `${s.colId}:${s.sort}`).join(',');

      const filter = filterModel
        ? Object.entries(filterModel)
          .flatMap(([field, conf]: any) => {
            if (conf.filterType === 'set' && Array.isArray(conf.values)) {
              return [`filter[${field}]=${conf.values.map(encodeURIComponent).join(',')}`];
            }

            const operator = AG_GRID_OPERATOR_MAP[conf.type] ?? '';
            const value = encodeURIComponent(conf.filter ?? true);
            const key = operator ? `filter[${field}][${operator}]` : `filter[${field}]`;
            return [`${key}=${value}`];
          })
          .join('&')
        : '';

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
        const lastRow = data.lastRow ?? rows.length + offset;
        params.success({ rowData: rows, rowCount: lastRow });
      } catch (err: any) {
        console.error('Fetch error:', err.message || err);
        params.fail();
      }
    },
  };
}
