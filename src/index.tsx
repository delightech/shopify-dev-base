import createApp from '@shopify/app-bridge';
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/ja.json';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import '@shopify/polaris/build/esm/styles.css';

import {
  FIREBASE_API_KEY,
  FIREBASE_FUNCTION_URL,
  FIREBASE_PROJECT_ID,
  SHOPIFY_API_KEY,
  SHOPIFY_API_SCOPES,
} from './configs';

const init = async () => {
  const uri = new URL(window.location.href);
  const shop = uri.searchParams.get('shop') as string;
  const host = uri.searchParams.get('host') as string;
  // アプリインストール後、redirect_uriに指定したURLへリダイレクトされる。
  const redirectUri = `${FIREBASE_FUNCTION_URL}/callbackFromAuth`;
  const permissionUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_API_SCOPES}&redirect_uri=${redirectUri}`;

  const config = {
    apiKey: SHOPIFY_API_KEY,
    host: host,
  };

  // アプリインストール時はリダイレクトされてくるので認証へリダイレクトし、
  // iframeで表示された場合はアプリを表示する。
  // 認証へリダイレクトする場合はhmac検証を行うのでセキュリティ的には問題ない。
  if (window.top === window.self) {
    window.location.href = permissionUrl;

    return;
  }
  // ここでpermissionUrlへリダイレクトしてしまうとリダイレクトループになるので注意

  console.log('create app!');
  // propsでコンポーネントにわたしていくのが良さそう。toastなど、app bridgeの機能を使う上で必要
  const app = createApp(config);

  // functionsでhmac検証をする
  // hmacの検証はshopify appのsecret keyを利用してサーバーサイドで行う
  try {
    await axios.get(`${FIREBASE_FUNCTION_URL}/verifyHmac${window.location.search}`);
  } catch (e) {
    console.log(e);

    return;
  }

  initializeApp({
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_PROJECT_ID,
  });

  ReactDOM.render(
    <AppProvider i18n={translations}>
      <Provider config={config}>
        <App />
      </Provider>
    </AppProvider>,
    document.getElementById('root'),
  );
};
init();
