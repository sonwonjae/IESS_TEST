import styled from 'styled-components';

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > input,
  & > textarea {
    width: 100%;
    padding: ${({ theme }) => theme.layout.padding.small};
    font-size: ${({ theme }) => theme.layout.fontSize.medium};
    color: ${({ theme }) => theme.color.primary[500]};

    &::placeholder {
      color: ${({ theme }) => theme.color.primary.shadow[60]};
    }
  }

  & > input {
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.primary.shadow[60]};

    &:focus {
      border-bottom: 0.1rem solid ${({ theme }) => theme.color.primary[500]};
    }
  }

  & > textarea {
    border: 0.1rem solid ${({ theme }) => theme.color.primary.shadow[60]};
    border-radius: ${({ theme }) => theme.layout.borderRadius.medium};
    min-height: 16rem;

    &:focus {
      border: 0.1rem solid ${({ theme }) => theme.color.primary[500]};
    }
  }
`;

export const ToggleInputContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: ${({ theme }) => theme.layout.margin.mediumSmall};
  margin-bottom: ${({ theme }) => theme.layout.margin.mediumSmall};

  & > label {
    display: flex;
    align-items: center;
    margin: 0;

    &::before {
      content: '';
      display: inline-block;
      margin-right: ${({ theme }) => theme.layout.margin.xSmall};
      width: ${({ theme }) => theme.layout.checkbox.blank};
      height: ${({ theme }) => theme.layout.checkbox.blank};
      border-radius: 50%;
      border: 0.1rem solid ${({ theme }) => theme.color.primary[500]};
      cursor: pointer;
    }
  }

  & > input:checked ~ label {
    &::after {
      content: '';
      position: absolute;
      left: ${({ theme }) => theme.layout.checkbox.empty};
      width: ${({ theme }) => theme.layout.checkbox.checked};
      height: ${({ theme }) => theme.layout.checkbox.checked};
      border-radius: 50%;
      border: 0.1rem solid ${({ theme }) => theme.color.primary[500]};
      background-color: ${({ theme }) => theme.color.primary[500]};
      cursor: pointer;
    }
  }
`;

export const Hints = styled.ul`
  display: flex;
  margin-top: ${({ theme }) => theme.layout.margin.small};
  gap: ${({ theme }) => theme.layout.padding.small};

  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.layout.padding.xSmall};
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.primary[500]};
    font-size: ${({ theme }) => theme.layout.fontSize.mediumSmall};
    font-weight: bold;
    border: 0.1rem solid ${({ theme }) => theme.color.primary[500]};
    border-radius: ${({ theme }) => theme.layout.borderRadius.small};

    & > button {
      color: ${({ theme }) => theme.color.primary[500]};
    }
  }
`;

export const Hint = styled.span``;
