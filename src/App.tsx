import './App.css';
import enTranslations from '@shopify/polaris/locales/ja.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
    <Page title="Example app">
      <Card sectioned>
        <Button onClick={() => alert('Button clicked!')}>Example button</Button>
      </Card>
    </Page>
  </AppProvider>
  );
}

export default App;
