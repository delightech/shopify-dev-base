import * as functions from 'firebase-functions';

export const FIREBASE_FUNCTION_URL = functions.config().functions.url;
export const SHOPIFY_API_KEY = functions.config().shopify.apikey;
export const SHOPIFY_APP_NAME = functions.config().shopify.appname;
export const SHOPIFY_SECRET = functions.config().shopify.secret;
