import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { Alert } from "../alert/Alert";
import { ParseServer } from "../../lib/parse";
import { Spinner } from "../general";

export const LayoutAdmin = ({
  children,
  filter,
  setFilter,
}: {
  children: ReactNode;
  filter: string;
  setFilter: Function;
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const currentUser = ParseServer.User.current();

  useEffect(() => {
    setIsAuth(Boolean(currentUser));
  }, []);

  return (
    <>
      {isAuth ? <Header filter={filter} setFilter={setFilter} /> : <Spinner />}

      <main className="container">
        <Alert />
        {children}
      </main>
      <style jsx>
        {`
          .container {
            @apply mx-auto;
          }
        `}
      </style>
    </>
  );
};
