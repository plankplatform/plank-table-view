import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { countriesColumns } from '@/columns/countries';
import { myTheme } from '@/styles/agTheme';

export default function Countries() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const columnDefs = useMemo(() => countriesColumns(t), [t]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const { data: rowData = [], isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const token = sessionStorage.getItem('apitoken');
      const res = await fetch(`${baseUrl}/geo/countries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : data.rows || [];
    },
  });

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType="clientSide"
        theme={myTheme}
        loading={isLoading}
        rowData={rowData}
      />
    </div>
  );
}
