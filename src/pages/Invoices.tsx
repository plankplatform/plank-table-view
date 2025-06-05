import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { invoicesColumns } from '@/columns/invoices';
import { usePaginatedGridData } from '@/lib/usePaginatedGridData';
import { myTheme } from '@/styles/agTheme';

export default function Invoices() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const columnDefs = useMemo(() => invoicesColumns(t), [t]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const { gridProps } = usePaginatedGridData({
    url: `${baseUrl}/invoices`,
    resource: 'invoices',
    pageSize: 20,
  });

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        theme={myTheme}
        {...gridProps}
      />
    </div>
  );
}
