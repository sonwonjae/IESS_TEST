import { MouseEventHandler, PropsWithChildren, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import * as ModalStyled from './Modal.style';

interface BasicModalProps {
  showBasicModal: boolean;
  setShowBasicModal: (value: SetStateAction<boolean>) => void;
}

function BasicModal({
  showBasicModal,
  setShowBasicModal,
  children,
}: PropsWithChildren<BasicModalProps>) {
  const closeModal: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget !== e.target) return;
    setShowBasicModal(false);
  };

  if (!showBasicModal) return <></>;

  return createPortal(
    <ModalStyled.BasicModalDim onClick={closeModal}>
      <ModalStyled.BasicModalContainer>
        {children}
      </ModalStyled.BasicModalContainer>
    </ModalStyled.BasicModalDim>,
    document.body
  );
}
export default BasicModal;
