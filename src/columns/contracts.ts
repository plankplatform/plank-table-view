import { TFunction } from 'i18next';
import { ColDef } from 'ag-grid-community';

export const contractsColumns = (t: TFunction): ColDef[] => [
  {
    field: 'utility',
    headerName: t('Utility'),
    filter: 'agTextColumnFilter',
    filterParams: { filterOptions: ['contains'], maxNumConditions: 0 },
  },
  {
    field: 'fiscal_code',
    headerName: t('Codice Fiscale'),
    filterParams: {
      filterOptions: ['equals', 'contains'],
      maxNumConditions: 0,
    },
  },
  {
    field: 'customer_code',
    headerName: t('Codice Cliente'),
    filterParams: {
      filterOptions: ['equals', 'contains'],
      maxNumConditions: 0,
    },
  },
  {
    field: 'company_name',
    headerName: t('Den. Sociale'),
    filter: false,
  },
  {
    field: 'starting_date',
    headerName: t('Data di inizio'),
    filter: false,
  },
  {
    field: 'ending_date',
    headerName: t('Data di fine'),
    filter: false,
  },
  {
    field: 'manual_ending_date',
    headerName: t('Data di cessazione'),
    filter: false,
  },
  {
    field: 'contract_info',
    headerName: t('Info Contratto'),
    filter: false,
  },
];
