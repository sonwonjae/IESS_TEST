import { PropsWithChildren } from 'react';

import * as LayoutStyled from './layout.style';

interface LayoutProps {}

function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <LayoutStyled.Header></LayoutStyled.Header>
      <LayoutStyled.Main>{children}</LayoutStyled.Main>
    </>
  );
}
export default Layout;
