import WelcomeModal from './WelcomeModal';

import { Overlay, ModalCard } from '../styles/Modal';

const modals = {
  welcome: WelcomeModal,
};

export default ({ active, closeModal }) => {
  const ModalComponent = modals[active];

  return (
    active && (
      <Overlay onClick={closeModal}>
        <ModalCard onClick={e => e.stopPropagation()}>
          <ModalComponent closeModal={closeModal} />
        </ModalCard>
      </Overlay>
    )
  );
};
