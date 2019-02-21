import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-gap: 20px;
  margin: 25px 0;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .mobile-container {
    display: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    margin: 25px 0 0;

    div {
      justify-content: flex-start;
    }

    .mobile-container {
      display: flex;
    }

    .profile-dropdown {
      display: none;
    }
  }
`;

export const Logo = styled.img`
  height: 45px;
  width: 45px;
  margin-right: 20px;
  border-radius: 3px;
  cursor: pointer;
`;
