import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.layout.padding.mediumSmall};
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.primary[500]};
  border: 0.1rem solid ${({ theme }) => theme.color.primary[500]};
  border-radius: ${({ theme }) => theme.layout.borderRadius.medium};
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary.shadow[20]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.primary[500]};
    color: ${({ theme }) => theme.color.white};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.gray[300]};
    color: ${({ theme }) => theme.color.gray[500]};
    border: 0.1rem solid ${({ theme }) => theme.color.gray[300]};
  }
`;
