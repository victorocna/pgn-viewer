import { sitename } from '../site.config';
import Head from 'next/head';
import '../css/index.css';

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
      <Component {...pageProps} />
    </>
  );
};

export default Root;
