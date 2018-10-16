import styled from "styled-components";

import NewPostModal from "./NewPostModal";
import WelcomeModal from "./WelcomeModal";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalCard = styled.div``;

const modals = {
  newPost: NewPostModal,
  welcome: WelcomeModal
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
