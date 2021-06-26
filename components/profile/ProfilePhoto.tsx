import { createRef, useEffect, useState } from "react";
import Parse from "parse";
import { profileApi } from "../../services";

import { Spinner } from "../general";
import { ParseServer } from "../../lib/parse";

export const ProfilePhoto = ({
  account,
  setAccount,
}: {
  account: Parse.Object;
  setAccount: Function;
}) => {
  const fileUpload = createRef<HTMLInputElement>();

  const [profilePhoto, setProfilePhoto] = useState<any>(
    "/img/user-default.png"
  );
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    setLoading(true);
    let reader = new FileReader();

    const fileType = event.currentTarget.files[0].type;
    const fileName = event.currentTarget.files[0].name;

    var dataURL = reader.result;
    reader.readAsDataURL(event.currentTarget.files[0]);

    reader.onload = function () {
      var dataURL = reader.result;
      setProfilePhoto(dataURL);
    };

    const currentUser = ParseServer.User.current();

    const data = await profileApi.uploadPhotoProfile(
      currentUser.id,
      event.currentTarget.files[0],
      fileName,
      fileType
    );

    setAccount(data);
    setLoading(false);
  };

  const handlerClickInput = (event) => {
    fileUpload.current.click();
  };

  useEffect(() => {
    if (account !== undefined) {
      setProfilePhoto(account.get("avatar").url());
    }
  }, [account]);

  return (
    <div className="bg-gray-100 p-3 border-t-4 border-colmena flex items-center justify-center">
      <div
        className="image overflow-hidden relative  w-64 h-64 "
        onClick={handlerClickInput}
      >
        {loading && (
          <div className="absolute visible bottom-1/4 right-1/4 flex items-center content-center p-8 bg-white bg-opacity-50  rounded z-40  ">
            <Spinner />
          </div>
        )}
        <img
          className="h-full w-full mx-auto rounded-full "
          src={profilePhoto}
          alt="Imagen Perfil"
          width="288"
          height="288"
        />
        <div className="absolute visible bottom-4 right-0 px-2 py-1 bg-white rounded z-40 ">
          <svg
            focusable="false"
            height="26"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h16v12zM12 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
          </svg>
        </div>
        <input
          id="profilePhoto"
          className="invisible"
          name="profilePhoto"
          type="file"
          accept="image/*"
          ref={fileUpload}
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};
