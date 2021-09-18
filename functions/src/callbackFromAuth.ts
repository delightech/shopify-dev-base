import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import ShopifyToken from 'shopify-token';
import {
SHOPIFY_API_KEY, SHOPIFY_APP_NAME, SHOPIFY_SHARED_SECRET,
} from './configs';

// example url
// https://asia-northeast1-***REMOVED***.cloudfunctions.net/callbackFromAuth?code=85c46a18d3842471550968d661470740&hmac=9e49b55143312005a15560565f1e64219263375ffa7bb2460fb0ba38601bd01e&host=ZGVsaWdodGVjaDMubXlzaG9waWZ5LmNvbS9hZG1pbg&shop=delightech3.myshopify.com&timestamp=1631944245
// http://localhost:5001/***REMOVED***/asia-northeast1/callbackFromAuth?code=85c46a18d3842471550968d661470740&hmac=9e49b55143312005a15560565f1e64219263375ffa7bb2460fb0ba38601bd01e&host=ZGVsaWdodGVjaDMubXlzaG9waWZ5LmNvbS9hZG1pbg&shop=delightech3.myshopify.com&timestamp=1631944246
export const callbackFromAuth = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 60, memory: '128MB' })
  .https.onRequest(async (request, response) => {
    const param = request;
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

    functions.logger.debug(redirectUrl);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await shopifyToken.getAccessToken(myshopifyDomain, code)
      .catch(() => { return null; });
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

    functions.logger.info(`created new shop ${myshopifyDomain}`);

    response.redirect(redirectUrl);
  });
