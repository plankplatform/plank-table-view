import { memo } from 'react';
import { IDetailCellRendererParams } from 'ag-grid-community';

type Ticket = {
  ticket_info?: string;
  working_operator?: string;
  expected_delivery?: string;
  response?: string;
  [key: string]: any;
};

export const TicketDetailRenderer = memo(({ data }: IDetailCellRendererParams<Ticket>) => {
  if (!data) return null;

  return (
    <div className="p-4">
      <div><strong>Info Ticket:</strong> {data.ticket_info}</div>
      <div><strong>Operatore:</strong> {data.working_operator}</div>
      <div><strong>Consegna Prevista:</strong> {data.expected_delivery}</div>
      <div><strong>Note:</strong> {data.response}</div>
      {/* Altri campi opzionali */}
    </div>
  );
});
