import { TFunction } from 'i18next';
import { ColDef } from 'ag-grid-community';

export const ticketsColumns = (t: TFunction, statuses: string[]): ColDef[] => {
  return [
    {
      field: 'expand',
      cellRenderer: 'agGroupCellRenderer',
      headerName: '',
      width: 40,
      cellRendererParams: {
        suppressCount: true,
      },
    },
    {
      field: 'ticket_id',
      headerName: t('ID Ticket'),
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'lessThan', 'greaterThan'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'customer_code',
      headerName: t('Codice Cliente'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'channel',
      headerName: t('Canale'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'title',
      headerName: t('Titolo'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'category',
      headerName: t('Categoria'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'ticket_info',
      headerName: t('Info Ticket'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'priority',
      headerName: t('Priorità'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'status',
      headerName: t('Stato'),
      filter: 'agSetColumnFilter',
      filterParams: {
        values: statuses,
        suppressSyncValuesAfterDataChange: true,
      },
    },
    {
      field: 'expected_closing',
      headerName: t('Stima Chiusura'),
      filter: 'agDateColumnFilter',
    },
    {
      field: 'expected_delivery',
      headerName: t('Consegna Prevista'),
      filter: 'agDateColumnFilter',
    },
    {
      field: 'creation_date',
      headerName: t('Data Inserimento'),
      filter: 'agDateColumnFilter',
    },
    {
      field: 'last_reminder',
      headerName: t('Ultimo Sollecito'),
      filter: 'agDateColumnFilter',
    },
    {
      field: 'userid',
      headerName: t('Userid'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'working_operator',
      headerName: t('Utente Lavorazione'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
    {
      field: 'working_group',
      headerName: t('Gruppo Lavorazione'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
    },
  ];
};
