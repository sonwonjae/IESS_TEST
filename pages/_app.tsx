import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global-style';
import Theme from '@styles/theme';

import { RecoilRoot } from 'recoil';

import './_app.css';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <ThemeProvider theme={Theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
