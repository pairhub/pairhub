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
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 900px;
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
