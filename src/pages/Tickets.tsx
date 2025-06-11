import { useTranslation } from 'react-i18next';
import { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { myTheme } from '@/styles/agTheme';
import { makeDatasource } from '@/lib/makeDatasource';
import { ticketsColumns } from '@/columns/tickets';
import { useQuery } from '@tanstack/react-query';

export default function Tickets() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);

  const { data: statuses } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const token = sessionStorage.getItem('apitoken');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets/statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : data.rows || [];
    },
  });

  //console.log('statuses', statuses);

  const columnDefs = useMemo(() => ticketsColumns(t, statuses), [t]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const datasource = useMemo(() => {
    return makeDatasource({
      url: `${import.meta.env.VITE_API_BASE_URL}/tickets`,
      resource: 'tickets',
      pageSize: 20,
    });
  }, []);

  // const onGridReady = async (params: any) => {
  //   const api = params.api;

  //   //const defaultFilter = statuses.filter((s: string) => s !== 'CLOSED');

  //   api.setColumnFilterModel('processing_status', {
  //     values: statuses
  //   });


  //   api.onFilterChanged();
  // };

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType="serverSide"
        cacheBlockSize={20}
        theme={myTheme}
        suppressServerSideFullWidthLoadingRow={true}
        rowBuffer={0}
        blockLoadDebounceMillis={200}
        pagination={true}
        paginationPageSize={20}
        serverSideDatasource={datasource}
        //onGridReady={onGridReady}
      />
    </div>
  );
}
