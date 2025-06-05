import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { contractsColumns } from '@/columns/contracts';
import { myTheme } from '@/styles/agTheme';
import { createServerSideDatasource } from '@/lib/createServerSideDatasource';

export default function Contracts() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

  const onGridReady = () => {
    if (gridRef.current?.api) {
      const datasource = createServerSideDatasource({
        url: `${baseUrl}/contracts`,
        resource: 'contracts',
        pageSize: 20,
      });
      gridRef.current.api.setGridOption('serverSideDatasource', datasource);
    }
  };

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
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
}
