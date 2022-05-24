import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global-style';
import Theme from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IESS</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
