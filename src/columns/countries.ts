import { TFunction } from 'i18next';
import { ColDef } from 'ag-grid-community';

export const countriesColumns = (t: TFunction): ColDef[] => [
  {
    field: 'id',
    headerName: t('ID'),
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'code_3l',
    headerName: t('Three-letter ISO code'),
    filter: 'agTextColumnFilter',
  },
  {
    field: 'code_2l',
    headerName: t('Two-letter ISO code'),
    filter: 'agTextColumnFilter',
  },
  {
    field: 'name',
    headerName: t('Name'),
    filter: 'agTextColumnFilter',
  },
  {
    field: 'official_name',
    headerName: t('Official name'),
    filter: 'agTextColumnFilter',
  },
  {
    field: 'latitude',
    headerName: t('Latitude'),
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'longitude',
    headerName: t('Longitude'),
    filter: 'agNumberColumnFilter',
  },
];
