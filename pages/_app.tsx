import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global-style';
import Theme from '@styles/theme';

import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
