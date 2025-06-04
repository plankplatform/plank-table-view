import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contracts from './pages/Contracts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'contracts',
    element: <Contracts />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
