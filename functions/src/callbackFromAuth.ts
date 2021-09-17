import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import ShopifyToken from 'shopify-token';
import {
SHOPIFY_API_KEY, SHOPIFY_APP_NAME, SHOPIFY_SHARED_SECRET,
} from './configs';

export const callbackFromAuth = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 60, memory: '128MB' })
  .https.onRequest(async (request, response) => {
    const param = { request };
    functions.logger.info('###callbackFromAuth###', param);
    functions.logger.debug(SHOPIFY_SHARED_SECRET, SHOPIFY_API_KEY);

    const shopifyToken = new ShopifyToken({
      redirectUri: 'https://example.com',
      sharedSecret: SHOPIFY_SHARED_SECRET,
      apiKey: SHOPIFY_API_KEY,
    });

    if (!shopifyToken.verifyHmac(request.query)) {
      response.status(400).send('Invalid hmac parameter');

      return;
    }

    const code = request.query.code as string;
    const myshopifyDomain = request.query.shop as string;
    const redirectUrl = `https://${myshopifyDomain}/admin/apps/${SHOPIFY_APP_NAME}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await shopifyToken.getAccessToken(myshopifyDomain, code).catch(() => null);
    if (!data) {
      response.status(400).send('Failed to get Shopify access token');

      return;
    }

    try {
      // Raise exception if user doesn't exists
      await admin.auth().getUser(myshopifyDomain);

      response.redirect(redirectUrl);

      return;
    // eslint-disable-next-line no-empty
    } catch {}

    await admin
      .auth()
      .createUser({ uid: myshopifyDomain })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(async (user) => {
        functions.logger.info('createUser');
      });

    functions.logger.info(`created new shop ${myshopifyDomain}`);

    response.redirect(redirectUrl);
  });
