import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.css";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => (
  <>
    <SessionProvider session={pageProps.session}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
    <Script
      id="google"
      type="text/javascript"
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
      async
      strategy="beforeInteractive"
      />
  </>
);

export default MyApp;
