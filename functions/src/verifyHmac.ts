import * as functions from 'firebase-functions';
import 'firebase-functions';
import ShopifyToken from 'shopify-token';
import {
  FIREBASE_PROJECT_ID,
  SHOPIFY_API_KEY,
  SHOPIFY_SHARED_SECRET,
} from './configs';

export const verifyHmac = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 60, memory: '128MB' })
  .https.onRequest(async (request, response) => {
    functions.logger.info('###verifyHmac###', request);
    functions.logger.debug(SHOPIFY_SHARED_SECRET, SHOPIFY_API_KEY);

    // hmacの検証だけ行うのでredirectUriは何でも良い（空だとエラー）
    const shopifyToken = new ShopifyToken({
      redirectUri: 'http://localhost:8080/callback',
      sharedSecret: SHOPIFY_SHARED_SECRET,
      apiKey: SHOPIFY_API_KEY,
    });

    response.set('Access-Control-Allow-Origin', `https://${FIREBASE_PROJECT_ID}.firebaseapp.com`);
    if (shopifyToken.verifyHmac(request.query)) {
      // 自分のfirebase projectからのアクセスのみ許可する
      response.status(200).send('Valid hmac parameter');
    } else {
      response.status(400).send('Invalid hmac parameter');
    }
  });
