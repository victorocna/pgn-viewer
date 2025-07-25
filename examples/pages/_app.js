import Head from 'next/head';
import { AppHead } from '../components';
import { ThemeProvider } from '../hooks';
import { sitename } from '../site.config';
import '../css/index.css';
import 'next-pgn-viewer/dist/bundle.css';

const Root = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{sitename}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <AppHead />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default Root;
