import createApp from '@shopify/app-bridge';
import { Provider } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/ja.json';
import { initializeApp } from 'firebase/app';
import * as queryString from 'query-string';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';
import { App } from './App';

import {
  FIREBASE_API_KEY,
  FIREBASE_FUNCTION_URL,
  FIREBASE_PROJECT_ID,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SCOPES,
} from './configs';

const init = () => {
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV);
  const query = queryString.parse(window.location.search);
  const shop = query.shop as string;
  const host = query.host as string;
  // アプリインストール後、redirect_uriに指定したURLへリダイレクトされる。
  const redirectUri = `${FIREBASE_FUNCTION_URL}/callbackFromAuth`;
  const permissionUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_API_SCOPES}&redirect_uri=${redirectUri}`;

  const config = {
    apiKey: SHOPIFY_API_KEY,
    host: host,
  };

  if (window.top === window.self) {
    console.log('initialize app!');
    window.location.assign(permissionUrl);
  } else {
    console.log('create app!');
    const app = createApp(config);
    Redirect.create(app).dispatch(Redirect.Action.APP, '/');
  }

  initializeApp({
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_PROJECT_ID,
  });

  ReactDOM.render(
    <React.StrictMode>
      <AppProvider i18n={translations}>
        <Provider config={config}>
          <App />
        </Provider>
      </AppProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
init();
