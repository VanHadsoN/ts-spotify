import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {NuqsAdapter} from "nuqs/adapters/react";

import './index.css';
import App from './App.tsx';
import Layout from './components/layout/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <NuqsAdapter>
              <Layout>
                  <App />
              </Layout>
          </NuqsAdapter>
      </BrowserRouter>
  </StrictMode>
);
