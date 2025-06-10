import { TFunction } from 'i18next';
import { ColDef } from 'ag-grid-community';

export const invoicesColumns = (t: TFunction): ColDef[] => [
  {
    field: 'invoice_id',
    headerName: t('ID'),
  },
  {
    field: 'company_name',
    headerName: t('Den. Sociale'),
    filter: 'agTextColumnFilter',
    sortable: false,
    filterParams: { filterOptions: ['equals', 'contains'], maxNumConditions: 0 },
  },
  {
    field: 'issue_date',
    headerName: t('Data Fattura'),
    filterParams: {
      filterOptions: ['equals', 'contains'],
      maxNumConditions: 0,
    },
  },
  {
    field: 'invoice_code',
    headerName: t('Codice Fattura'),
    filterParams: {
      filterOptions: ['equals', 'contains'],
      maxNumConditions: 0,
    },
  },
  {
    field: 'payment_status',
    headerName: t('Stato Pagamento'),
    filter: false,
  },
];
