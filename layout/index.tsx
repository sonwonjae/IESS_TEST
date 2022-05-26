import { PropsWithChildren } from 'react';

interface LayoutProps {}

function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
export default Layout;
