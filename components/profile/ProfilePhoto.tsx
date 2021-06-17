import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { createRef, useState } from "react";

export const ProfilePhoto = (data = undefined) => {
  interface OrganizationValues {
    profilePhoto: string;
  }

  const fileUpload = createRef<HTMLDivElement>();

  const [profilePhoto, setProfilePhoto] = useState<any>("/img/profile.png");

  //   const profilePhoto =
  // data === undefined ? "/img/profile.png" : data.get("image");

  const initialValues: OrganizationValues = {
    profilePhoto,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
  });

  const onSubmitPatchHandler = (values: any) => {
    console.log({ values });
  };

  const handleFileUpload = (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.currentTarget.files[0]);
    var dataURL = reader.result;

    reader.onload = function () {
      var dataURL = reader.result;
      setProfilePhoto(dataURL);
    };
  };

  const handlerClickInput = (event) => {
    console.log(event);
    fileUpload.current.click();
  };

  return (
    <div className="bg-gray-100 p-3 border-t-4 border-colmena flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitPatchHandler}
      >
        <div
          className="image overflow-hidden relative  w-64 h-64 "
          onClick={handlerClickInput}
        >
          <img
            className="h-full w-full mx-auto rounded-full "
            src={profilePhoto}
            alt="Imagen Perfil"
            width="288"
            height="288"
          />
          <div className="absolute visible bottom-4 right-0 px-2 py-1 bg-white rounded z-50 ">
            <svg
              enable-background="new 0 0 24 24"
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
      </Formik>
    </div>
  );
};
