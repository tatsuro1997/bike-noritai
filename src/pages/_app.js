import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  </SessionProvider>
);

export default MyApp;
