import { MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useRecoilState } from 'recoil';
import { showBasicModalState } from '@store/modal';
import * as ModalStyled from './Modal.style';

interface BasicModalProps {}

function BasicModal({ children }: PropsWithChildren<BasicModalProps>) {
  const [showBasicModal, setShowBasicModal] =
    useRecoilState(showBasicModalState);
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
