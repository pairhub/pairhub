import Link from "next/link";
import Head from "next/head";

const linkStyle = {
  marginRight: "15px"
};

const Header = () => (
  <div>
    <Head>
      <title>PairHub</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Find remote pair programming buddies" />
      <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
      <style>{`
      ::selection {
        color: white;
        background: #0000ff;
      }
    `}</style>
    </Head>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
