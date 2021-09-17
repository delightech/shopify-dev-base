import * as functions from 'firebase-functions';

export const FIREBASE_FUNCTION_URL = functions.config().delightech.dev.firebase.functions.url;
export const FIREBASE_HOSTING_URL = functions.config().delightech.dev.firebase.hosting.url;
export const SHOPIFY_API_KEY = functions.config().delightech.dev.shopify.api.key;
export const SHOPIFY_APP_NAME = functions.config().delightech.dev.shopify.app.name;
export const SHOPIFY_SHARED_SECRET = functions.config().delightech.dev.shopify.shared.secret;
