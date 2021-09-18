import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { callbackFromAuth } from './callbackFromAuth';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const testFunc = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 60, memory: '128MB' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .https.onRequest(async (request, response) => {
    functions.logger.debug('testFunc!!!');
    console.log('test');
    response.send('Hello from Firebase!');
});
export {
  testFunc,
  callbackFromAuth,
};
