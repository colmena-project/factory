import { LayoutAdmin } from "./LayoutAdmin";
import { LayoutLogin } from "./LayoutLogin";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export const Layout = ({
  children,
  filter,
  setFilter,
}: {
  children: ReactNode;
  filter: string;
  setFilter: Function;
}) => {
  const router = useRouter();
  const isLogin =
    router.asPath === "/auth/login" || router.asPath === "/auth/reset-password"
      ? true
      : false;
  return isLogin ? (
    <LayoutLogin>{children}</LayoutLogin>
  ) : (
    <LayoutAdmin filter={filter} setFilter={setFilter}>
      {children}
    </LayoutAdmin>
  );
};
