import styled from 'styled-components';

import * as CommonStyled from '@components/Common/Common.style';

export const Form = styled.form`
  & > div:not(:first-child) {
    margin-top: ${({ theme }) => theme.layout.margin.medium};
  }

  & label {
    order: -1;
    display: inline-block;
    font-weight: bold;
    font-size: ${({ theme }) => theme.layout.labelSize};
    color: ${({ theme }) => theme.color.primary[500]};
    margin-bottom: ${({ theme }) => theme.layout.margin.small};
  }

  & input:required ~ label::before {
    content: '*';
    position: absolute;
    top: ${({ theme }) => `-${theme.layout.padding.small}`};
    left: ${({ theme }) => `-${theme.layout.padding.small}`};
    color: ${({ theme }) => theme.color.required};
  }
`;

export const SubmitButton = styled(CommonStyled.Button)`
  font-size: ${({ theme }) => theme.layout.labelSize};
  margin-top: ${({ theme }) => theme.layout.margin.medium};
`;
