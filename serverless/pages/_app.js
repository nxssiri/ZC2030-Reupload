import "../styles/globals.css";
import "../styles/Header.module.css";
import Layout from "../Components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Layout>
            <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </SSRProvider>
  );
}

export default MyApp;
