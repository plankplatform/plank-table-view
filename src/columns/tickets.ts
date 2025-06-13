import { TFunction } from 'i18next';
import { ColDef } from 'ag-grid-community';

export const ticketsColumns = (t: TFunction, statuses: string[]): ColDef[] => {
  return [
    {
      field: 'expand',
      cellRenderer: 'agGroupCellRenderer',
      headerName: '',
      cellRendererParams: {
        suppressCount: true,
      },
      width: 50,
    },
    // {
    //   field: 'ticket_id',
    //   headerName: t('ID Ticket'),
    //   filter: 'agNumberColumnFilter',
    //   filterParams: {
    //     filterOptions: ['equals', 'lessThan', 'greaterThan'],
    //     maxNumConditions: 0,
    //   },
    // },
    {
      field: 'title',
      headerName: t('Titolo'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      width: 575,
    },
    {
      field: 'customer_code',
      headerName: t('Cod. Cliente'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      width: 120,
      sortable: true,
    },
    {
      field: 'channel',
      headerName: t('Canale'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      width: 120,
      sortable: true,
    },
    {
      field: 'category',
      headerName: t('Categoria'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      width: 120,
      sortable: true,
    },
    {
      field: 'ticket_info',
      headerName: t('Info Ticket'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      sortable: true,
    },
    {
      field: 'priority',
      headerName: t('Priorità'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      width: 120,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('Stato'),
      filter: 'agSetColumnFilter',
      filterParams: {
        values: statuses,
        suppressSyncValuesAfterDataChange: true,
      },
      sortable: true,
    },
    {
      field: 'expected_closing',
      headerName: t('Stima Chiusura'),
      filter: 'agDateColumnFilter',
      sortable: true,
    },
    // {
    //   field: 'expected_delivery',
    //   headerName: t('Consegna Prevista'),
    //   filter: 'agDateColumnFilter',
    // },
    // {
    //   field: 'creation_date',
    //   headerName: t('Data Inserimento'),
    //   filter: 'agDateColumnFilter',
    // },
    // {
    //   field: 'last_reminder',
    //   headerName: t('Ultimo Sollecito'),
    //   filter: 'agDateColumnFilter',
    // },
    // {
    //   field: 'userid',
    //   headerName: t('Userid'),
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     filterOptions: ['equals', 'contains'],
    //     maxNumConditions: 0,
    //   },
    // },
    {
      field: 'working_operator',
      headerName: t('Utente Lavorazione'),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'contains'],
        maxNumConditions: 0,
      },
      sortable: true,
    },
    // {
    //   field: 'working_group',
    //   headerName: t('Gruppo Lavorazione'),
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     filterOptions: ['equals', 'contains'],
    //     maxNumConditions: 0,
    //   },
    // },
  ];
};
