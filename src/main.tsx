import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'ag-grid-enterprise';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRouter } from './router';
import i18n from './i18n';

const env = import.meta.env.VITE_APP_ENV;

if (sessionStorage.getItem('language')) {
  if (sessionStorage.getItem('language') === 'Italian') {
    i18n.changeLanguage('it');
  } else if (sessionStorage.getItem('language') === 'English') {
    i18n.changeLanguage('en');
  }
} else {
  i18n.changeLanguage('en');
}

async function login() {}
if (env === 'local') {
  if (sessionStorage.getItem('apitoken')) {
    console.log('API token already set in sessionStorage');
  } else {
    console.log('Fetching API token...');
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: import.meta.env.VITE_API_USER,
        password: import.meta.env.VITE_API_PASSWORD,
      }),
    });

    const data = await response.json();
    if (data.jwt) {
      sessionStorage.setItem('apitoken', data.jwt);
    } else {
      console.error('Failed to fetch API token:', data);
    }
  }
}

const queryClient = new QueryClient();

import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_LICENSE_KEY);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      {import.meta.env.VITE_APP_ENV === 'local' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);

login();
