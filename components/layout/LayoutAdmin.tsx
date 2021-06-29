import { ReactNode } from "react";
import Header from "./Header";
import { Alert } from "../alert/Alert";

export const LayoutAdmin = ({
  children,
  filter,
  setFilter,
}: {
  children: ReactNode;
  filter: string;
  setFilter: Function;
}) => {
  return (
    <>
      <Header filter={filter} setFilter={setFilter} />

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
