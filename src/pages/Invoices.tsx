import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { myTheme } from '@/styles/agTheme';
import { makeDatasource } from '@/lib/makeDatasource';
import { invoicesColumns } from '@/columns/invoices';

export default function Invoices() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);

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

  const datasource = useMemo(() => {
    return makeDatasource({
      url: `${import.meta.env.VITE_API_BASE_URL}/invoices`,
      resource: 'invoices',
      pageSize: 20,
    });
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
      />
    </div>
  );
}
