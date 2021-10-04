import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import 'firebase-functions';
import { callbackFromAuth } from './callbackFromAuth';
import {
  FIREBASE_FUNCTION_URL,
} from './configs';
import { verifyHmac } from './verifyHmac';

admin.initializeApp();

const testFunc = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 60, memory: '128MB' })
  .https.onRequest(async (request, response) => {
    functions.logger.debug('testFunc!!!');
    functions.logger.debug(request.query);
    functions.logger.debug(new Date());
    // 自分のfirebase projectからのアクセスのみ許可する
    response.set('Access-Control-Allow-Origin', FIREBASE_FUNCTION_URL);
    response.send('Hello from Firebase!');
  });

export {
  testFunc,
  callbackFromAuth,
  verifyHmac,
};
