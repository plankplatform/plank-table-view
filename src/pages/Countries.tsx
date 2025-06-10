import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { countriesColumns } from '@/columns/countries';
import { myTheme } from '@/styles/agTheme';
import LoadingCellRenderer from '@/components/LoadingCellRenderer';
import { ICellRendererParams } from 'ag-grid-community';

export default function Countries() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const token = sessionStorage.getItem('apitoken');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/geo/countries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : data.rows || [];
    },
  });

  const rowData = isLoading ? [null] : data;

  const columnDefs = useMemo(() => {
    const base = countriesColumns(t);
    return base.map((col) => ({
      ...col,
      cellRenderer: (params: ICellRendererParams) => {
        if (!params.data) return <LoadingCellRenderer />;
        return params.value;
      },
    }));
  }, [t]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType="clientSide"
        theme={myTheme}
        rowData={rowData}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
}
