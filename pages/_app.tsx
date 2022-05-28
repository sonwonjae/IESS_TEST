import type { AppProps } from 'next/app';

import { useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global-style';
import Theme from '@styles/theme';

import { RecoilRoot } from 'recoil';

import './_app.css';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <ThemeProvider theme={Theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
