import { useRouter } from "next/router";
import { useContext } from "react";

import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";
import Footer from "./footer";
import MainNavigation from "./main-navigation";
import TopMainNavigation from "./top-main-navigation";

function Layout(props) {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  let navigation;

  if (router.pathname === "/") {
    navigation = <TopMainNavigation />;
  } else {
    navigation = <MainNavigation />;
  }

  return (
    <>
      {navigation}
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Footer />
    </>
  );
}

export default Layout;
