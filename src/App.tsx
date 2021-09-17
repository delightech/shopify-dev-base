import {
 AppProvider, Page, Card, Button,
} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/ja.json';
// eslint-disable-next-line no-use-before-define
import React from 'react';

const App = () => (
  <AppProvider i18n={enTranslations}>
    <Page title="Example app">
      <Card sectioned>
        <Button onClick={() => alert('Button clicked!')}>Example button</Button>
      </Card>
    </Page>
  </AppProvider>
  );

export default App;
