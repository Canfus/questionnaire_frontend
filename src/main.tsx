import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import '@splidejs/react-splide/css/core';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { GeolocationProvider, store } from '@app/common';

import { App } from './App';
import './assets/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <ReduxProvider store={store}>
          <GeolocationProvider>
            <App />
          </GeolocationProvider>
        </ReduxProvider>
      </BrowserRouter>
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>,
);
