import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contracts from './pages/Contracts';
import Invoices from './pages/Invoices';
import Countries from './pages/Countries';
import ContractView from './pages/ContractView';
import ContractEdit from './pages/ContractEdit';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'contracts',
    element: <Contracts />,
  },
  {
    path: 'contracts/:id/view',
    element: <ContractView />,
  },
  {
    path: 'contracts/:id/edit',
    element: <ContractEdit />,
  },
  {
    path: 'invoices',
    element: <Invoices />,
  },
  {
    path: '/countries',
    element: <Countries />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
