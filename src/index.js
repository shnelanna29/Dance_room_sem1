import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { WithQuery } from './app/providers/with-query';
import { WithRouter } from './app/providers/with-router';
import { AuthProvider } from './app/providers/with-auth';
import { App } from './app/index';
import './app/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WithQuery>
        <WithRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WithRouter>
      </WithQuery>
    </Provider>
  </React.StrictMode>
);
