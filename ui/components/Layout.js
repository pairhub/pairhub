import Header from "./Header";
import styled, { injectGlobal } from "styled-components";

injectGlobal`
  body {
    padding: 0;
    margin: 0;
    background: #f4f5f6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
  a {
    color: #0000FF;
    cursor: pointer;
  }
`;

const MainLayout = styled.div`
  display: grid;
  max-width: 940px;
  margin: 0 auto;
  padding: 0 20px;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  justify-content: center;
`;

const Content = styled.div``;

const Layout = props => (
  <MainLayout>
    <Header />
    <Content>{props.children}</Content>
  </MainLayout>
);

export default Layout;
