import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.layout.height.header};
`;

export const Main = styled.main`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.maxWidth};
  height: calc(100vh - ${({ theme }) => theme.layout.height.header});
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.padding.medium};
  margin-top: ${({ theme }) => theme.layout.height.header};
`;
