import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  const cards = [
    { key: 'digital_contracts', path: '/digital-contracts' },
    { key: 'contracts', path: '/contracts' },
    { key: 'invoices', path: '/invoices' },
    { key: 'countries', path: '/countries' },
    { key: 'tickets', path: '/tickets' },
  ];

  return (
    <div className="p-8">
      {/* <h1 className="text-3xl font-bold mb-6">{t('dashboard')}</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ key, path }) => (
          <Link
            key={key}
            to={path}
            className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{t(`sections.${key}`)}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
