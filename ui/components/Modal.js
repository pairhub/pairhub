import styled from "styled-components";

import NewPost from "./NewPost";

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

const ModalCard = styled.div`
  background: white;
  border-radius: 8px;
  min-height: 400px;
  min-width: 500px;
`;

const modals = {
  newPost: <NewPost />
};

export default ({ active, closeModal }) => {
  let modal;
  if (active === "newPost") {
    modal = <NewPost closeModal={closeModal} />;
  }
  return (
    active && (
      <Overlay onClick={closeModal}>
        <ModalCard onClick={e => e.stopPropagation()}>{modal}</ModalCard>
      </Overlay>
    )
  );
};
