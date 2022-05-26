import styled from 'styled-components';

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.layout.fontSize.medium};
  font-weight: bold;
  width: ${({ theme }) => theme.layout.fontSize.medium};
  height: ${({ theme }) => theme.layout.fontSize.medium};
`;
