import styled from 'styled-components';

export const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.dim};
  padding: ${({ theme }) => theme.layout.padding.medium};
`;

export const BasicModalDim = styled(Dim)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BasicModalContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  min-height: 30rem;
  max-height: 54rem;
  padding: ${({ theme }) => theme.layout.padding.medium};
  border-radius: ${({ theme }) => theme.layout.borderRadius.medium};
  background-color: ${({ theme }) => theme.color.white};
`;
