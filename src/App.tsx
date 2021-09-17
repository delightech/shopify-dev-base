import {
 AppProvider, Page, Card, Button,
} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/ja.json';
// eslint-disable-next-line no-use-before-define
import React from 'react';

// eslint-disable-next-line no-alert
const test = () => alert('Button clicked!');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => (
  <AppProvider i18n={enTranslations}>
    <Page title="Example app">
      <Card sectioned>
        <Button onClick={test}>Example button</Button>
      </Card>
    </Page>
  </AppProvider>
  );

export default App;
