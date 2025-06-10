import ActionButtons from '@/components/ActionButtons';

type ActionButtonsRendererProps = {
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
};

export const ActionButtonsRenderer = ({ onView, onEdit }: ActionButtonsRendererProps) => {
  return (props: any) => {
    if (!props.data) return null;
    return <ActionButtons row={props.data} onView={onView} onEdit={onEdit} />;
  };
};
