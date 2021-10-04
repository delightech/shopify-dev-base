import * as functions from 'firebase-functions';
import 'firebase-functions';
import ShopifyToken from 'shopify-token';
import {
  FIREBASE_HOSTING_URL,
  SHOPIFY_API_KEY,
  SHOPIFY_SECRET,
} from './configs';

export const verifyHmac = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 60, memory: '128MB' })
  .https.onRequest(async (request, response) => {
    functions.logger.info('###verifyHmac###', request);
    functions.logger.debug(SHOPIFY_SECRET, SHOPIFY_API_KEY);

    // hmacの検証だけ行うのでredirectUriは何でも良い（空だとエラー）
    const shopifyToken = new ShopifyToken({
      redirectUri: 'http://localhost:8080/callback',
      sharedSecret: SHOPIFY_SECRET as string,
      apiKey: SHOPIFY_API_KEY as string,
    });

    response.set('Access-Control-Allow-Origin', FIREBASE_HOSTING_URL as string);
    if (shopifyToken.verifyHmac(request.query)) {
      functions.logger.debug('#####TEST1#####');
      // 自分のfirebase projectからのアクセスのみ許可する
      response.status(200).send('Valid hmac parameter');
    } else {
      functions.logger.debug('#####TEST2#####');
      // 自分のfirebase projectからのアクセスのみ許可する
      response.status(400).send('Invalid hmac parameter');
    }
  });
