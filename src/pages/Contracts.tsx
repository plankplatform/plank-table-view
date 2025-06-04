import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { contractsColumns } from '@/columns/contracts';
import { makeDatasource } from '@/lib/makeDatasource';
import { myTheme } from '@/styles/agTheme';

export default function Contracts() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = sessionStorage.getItem('apitoken');

  const columnDefs = useMemo(() => contractsColumns(t), [t]);

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
    if (!token) return null;
    return makeDatasource({ url: `${baseUrl}/contracts` });
  }, [baseUrl, token]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType="infinite"
        pagination
        paginationPageSize={20}
        cacheBlockSize={20}
        datasource={datasource || undefined}
        theme={myTheme}
      />
    </div>
  );
}
