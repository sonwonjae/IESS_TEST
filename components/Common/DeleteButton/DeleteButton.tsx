import Theme from '@styles/theme';
import { MouseEventHandler, PropsWithChildren } from 'react';

import * as DeleteButtonStyled from './DeleteButton.style';

interface DeleteButtonProps {
  size?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function DeleteButton({
  size = 8,
  onClick,
}: PropsWithChildren<DeleteButtonProps>) {
  return (
    <DeleteButtonStyled.DeleteButton onClick={onClick} tabIndex={-1}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 30 30"
        fill={Theme.color.primary[500]}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M26.3137 0.85791L29.1421 3.68634L3.6863 29.1422L0.857877 26.3138L26.3137 0.85791Z" />
        <path d="M0.85791 3.68628L3.68634 0.857852L29.1422 26.3137L26.3138 29.1421L0.85791 3.68628Z" />
      </svg>
    </DeleteButtonStyled.DeleteButton>
  );
}

export default DeleteButton;
