import createApp from '@shopify/app-bridge';
import { Provider, Context } from '@shopify/app-bridge-react';
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
  // emulator URL
  // http://localhost:5000/?shop=delightech3.myshopify.com
  const query = queryString.parse(window.location.search);
  const shopDomain = query.shop as string;
  // アプリインストール後、ここで指定するURLへリダイレクトされる。
  // パラメータでcodeとhmacが渡される。
  // hmacで正しいリクエストであることを確認。その後codeをaccess_tokenに変換する。（DB保持が必要？）
  // TODO codeをaccess_tokenに変換するfunctionsを作成する。そのURLをredirectUriに指定する
  const redirectUri = `${FIREBASE_FUNCTION_URL}/callbackFromAuth`;
  const permissionUrl = `https://${shopDomain}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_API_SCOPES}&redirect_uri=${redirectUri}`;

  const config = {
    apiKey: SHOPIFY_API_KEY,
    host: shopDomain,
  };

  // eslint-disable-next-line no-console
  console.log(permissionUrl);

  if (window.top === window.self) {
    window.location.assign(permissionUrl);
  } else {
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
