import React, { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Context as UserContext } from "../../context/userContext";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

const Header = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: Function;
}) => {
  const router = useRouter();
  const { account } = useContext(UserContext);
  // const [userNavbar, setUserNavar] = useState(false);
  const [userImage, setUserImage] = useState<string>("/img/user-default.png");

  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive]: [boolean, Function] = useDetectOutsideClick({
    el: dropdownRef,
    initialState: false,
  });

  const onChangeInput = (valueFilter: string) => {
    setFilter(valueFilter || "");
  };

  const handleClickUser = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (account !== undefined) {
      setUserImage(account.get("avatar").url());
    }
  }, [account]);

  return (
    <>
      <div className="header">
        <div className="header_inner">
          <div className="header_inner_flex">
            <div className="item">
              <Link href={{ pathname: "/" }}>
                <a className="mt-2 logo_colmena">
                  <Image height="29" width="133" src="/img/logo.png" />
                </a>
              </Link>
            </div>
            <div className="item">
              <div className="ico_search">
                <Image
                  src="/img/search.png"
                  alt="search"
                  width="24"
                  height="24"
                />
              </div>

              <input
                value={filter || ""}
                onChange={(e) => {
                  onChangeInput(e.target.value);
                }}
                className="input_search"
                placeholder="buscar transacciones, cod de prod, usuario"
              />
            </div>
            <div className="item">
              <button
                type="button"
                onClick={handleClickUser}
                className="button_ico avatar"
              >
                <span className="sr-only">Abrir menu del usuario</span>
                <Image
                  src={userImage}
                  alt="Perfil"
                  width="36"
                  className="perfil rounded-full"
                  height="36"
                />
              </button>
            </div>

            <div
              className={isActive ? "menu_user  " : "menu_user  hidden"}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <Link href="/perfil">
                <a
                  className="menu_user_item"
                  role="menuitem"
                  id="user-menu-item-0"
                >
                  Perfil
                </a>
              </Link>
              <Link href="/auth/logout">
                <a
                  className="menu_user_item"
                  role="menuitem"
                  id="user-menu-item-1"
                >
                  Cerrar Sesion
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .header {
            @apply w-screen shadow  top-0 z-30 text-white h-16 bg-colmena;
          }
          .header_top {
            @apply md:bg-opacity-50 bg-colmena backdrop-filter backdrop-blur mx-auto;
          }
          .logo_colmena {
            @apply w-20 md:w-auto;
          }

          .header_inner {
            @apply mx-auto px-3 pt-2 sm:pt-0;
          }
          .header_inner_flex {
            @apply flex items-center justify-between flex-row;
          }

          .ico_search {
            @apply hidden	 sm:contents;
          }

          .item {
            @apply flex items-center;
          }

          .button_ico {
            @apply flex p-2 rounded-md mr-2 focus:outline-none focus:ring-2;
          }

          .avatar {
          }

          .input_search {
            transition: background-color 0.5s linear;
            @apply m-1 md:m-2 p-1 md:p-3 bg-transparent rounded md:w-96 w-24 font-medium text-white placeholder-white focus:bg-white focus:placeholder-gray-600 focus:text-gray-900 focus:outline-none;
          }
          .perfil {
            transition: all 0.5s ease;
          }

          .menu_user {
            @apply origin-top-right absolute right-2 top-14  w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none;
          }

          .menu_user_item {
            @apply block px-4 py-2 text-sm text-gray-700  cursor-pointer hover:bg-gray-200 rounded m-1;
          }
        `}
      </style>
    </>
  );
};

export default Header;
// export default React.memo(Header, () => true);
