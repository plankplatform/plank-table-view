import { useTranslation } from 'react-i18next';
import { useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { myTheme } from '@/styles/agTheme';
import { makeDatasource } from '@/lib/makeDatasource';
import { ticketsColumns } from '@/columns/tickets';
import { useQuery } from '@tanstack/react-query';
import { TicketDetailRenderer } from '@/components/TicketDetailRenderer';
import {
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
  GridReadyEvent,
} from 'ag-grid-community';

export default function Tickets() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);

  const { data: statuses } = useQuery({
    queryKey: ['tickets-statuses'],
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
      sortable: false,
      filter: false,
      resizable: false,
      suppressHeaderMenuButton: true
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

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitCellContents",
    };
  }, []);
  
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
        masterDetail={true}
        isRowMaster={() => true}
        detailCellRenderer={TicketDetailRenderer}
        detailRowHeight={200}
        autoSizeStrategy={autoSizeStrategy}
        //suppressCellFocus={true}
      />
    </div>
  );
}
