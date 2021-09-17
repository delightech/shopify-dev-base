import * as admin from 'firebase-admin';
import { callbackFromAuth } from './callbackFromAuth';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export { callbackFromAuth };
