import Header from "./Header";

const Layout = props => (
  <div className="layout">
    <div className="header">
      <Header />
    </div>
    <div className="content">{props.children}</div>

    <style jsx>{`
      .layout {
        display: grid;
        grid-template-rows: 60px 1fr;
      }
      .header {
        background: #f4f5f6;
        display: grid;
        align-items: center;
        padding: 20px;
      }
      .content {
        padding: 20px;
      }
    `}</style>

    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
      }
    `}</style>
  </div>
);

export default Layout;
