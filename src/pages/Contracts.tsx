import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { contractsColumns } from '@/columns/contracts';
import { myTheme } from '@/styles/agTheme';
import { makeDatasource } from '@/lib/makeDatasource';
import { useNavigate } from 'react-router-dom';

export default function Contracts() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);

  const navigate = useNavigate();

  const onView = (row: any) => navigate(`/contracts/${row.id}/view`);
  const onEdit = (row: any) => navigate(`/contracts/${row.id}/edit`);

  const columnDefs = useMemo(() => contractsColumns(t, onView, onEdit), [t]);

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
      url: `${import.meta.env.VITE_API_BASE_URL}/contracts`,
      resource: 'contracts',
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
