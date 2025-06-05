import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contracts from './pages/Contracts';
import Invoices from './pages/Invoices';
import Countries from './pages/Countries';

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
