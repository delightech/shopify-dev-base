import * as admin from 'firebase-admin';
import * as callbackFromAuth from './callbackFromAuth';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export { callbackFromAuth };
