import { Button } from '@shopify/polaris';

// eslint-disable-next-line no-alert
const test = () => { return alert('Button clicked!'); };

export const Home = () => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Button onClick={test}>TEST</Button>
  );
};
