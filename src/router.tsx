import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contracts from './pages/Contracts';
import Invoices from './pages/Invoices';

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
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
