import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { countriesColumns } from '@/columns/countries';
import { useGridData } from '@/lib/useGridData';
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

  const { gridProps } = useGridData({
    url: `${baseUrl}/geo/countries`,
    resource: 'countries',
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
