import { Eye, Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';

type ActionButtonsProps<T = any> = {
  row: T;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
};

export default function ActionButtons<T = any>({ row, onView, onEdit }: ActionButtonsProps<T>) {
  const { t } = useTranslation();
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        {onView && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onView(row)}
                className="p-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                <Eye size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('button.view')}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {onEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onEdit(row)}
                className="p-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                <Pencil size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('button.edit')}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
