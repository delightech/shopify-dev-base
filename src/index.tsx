import React from 'react';
import { Redirect } from '@shopify/app-bridge/actions';
import ReactDOM from 'react-dom';
import { AppProvider } from '@shopify/polaris';
import createApp from '@shopify/app-bridge';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/ja.json';
import { initializeApp } from 'firebase/app';
import * as queryString from 'query-string';
import App from './App';

import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SCOPES,
} from './config';

const parsed = queryString.parse(window.location.search);
const shopDomain = parsed.shop as string;
// アプリインストール後、ここで指定するURLへリダイレクトされる。
// パラメータでcodeとhmacが渡される。
// hmacで正しいリクエストであることを確認。その後codeをaccess_tokenに変換する。（DB保持が必要？）
// TODO codeをaccess_tokenに変換するfunctionsを作成する。そのURLをredirectUriに指定する
const redirectUri = 'allowed redirect URI from Shopify Partner Dashboard';
const permissionUrl = `https://${shopDomain}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_API_SCOPES}&redirect_uri=${redirectUri}`;

const config = {
  apiKey: SHOPIFY_API_KEY,
  host: shopDomain,
};

if (window.top === window.self) {
  window.location.assign(permissionUrl);
} else {
  const app = createApp(config);
  Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
}

initializeApp({
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
});

ReactDOM.render (
  <React.StrictMode>
    <AppProvider i18n={translations}>
      <Provider config={config}>
        <App />
      </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);