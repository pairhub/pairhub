// import "tailwindcss/tailwind.css";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles.css";
import "tippy.js/dist/tippy.css"; // optional

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>PairHub</title>
        <meta
          name="description"
          content="Find remote pair programming peers or experts"
        />
        <link rel="icon" href="/favicon.ico" />
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Head>
      <Layout user={session?.user} loading={loading}>
        <Component {...pageProps} user={session?.user} />
      </Layout>
    </>
  );
}

export default MyApp;
