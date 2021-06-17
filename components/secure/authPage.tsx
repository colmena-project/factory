import { useRouter } from "next/router";
import { ElementType } from "react";
import { ParseServer } from "../../lib/parse";

const authPage = (WrappedComponent: ElementType) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const currentUser = ParseServer.User.current();

      // If there is no access token we redirect to "/" page.
      if (!Boolean(currentUser)) {
        Router.replace("/auth/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default authPage;
