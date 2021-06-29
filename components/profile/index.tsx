import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { ProfilePhoto } from "./ProfilePhoto";
import { Context as UserContext } from "../../context/userContext";
import Parse from "parse";
import { Button } from "../../components/button";
import { Spinner } from "../general";
import { profileApi } from "../../services";
import { alertService } from "../../services/alert";

export const Profile = ({ account }: { account: Parse.Object }) => {
  interface AccountValues {
    firstName: string;
    middleName: string;
    lastName: string;
    aboutMe: string;
    nickname: string;
    phoneNumber: string;
    website: string;
  }

  const [loading, setLoading] = useState(false);
  const { setAccount } = useContext(UserContext);

  const firstName = account === undefined ? "" : account.get("firstName");
  const middleName = account === undefined ? "" : account.get("middleName");
  const lastName = account === undefined ? "" : account.get("lastName");
  const aboutMe = account === undefined ? "" : account.get("aboutMe");
  const nickname = account === undefined ? "" : account.get("nickname");
  const phoneNumber = account === undefined ? "" : account.get("phoneNumber");
  const website = account === undefined ? "" : account.get("website");

  const initialValues: AccountValues = {
    firstName,
    middleName,
    lastName,
    aboutMe,
    nickname,
    phoneNumber,
    website,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Requerido")
      .min(3, "Debe contener al menos 3 caracteres")
      .max(255, "La cantidad maxima de caracteres es 255"),
    middleName: Yup.string()
      .required("Requerido")
      .min(3, "Debe contener al menos 3 caracteres")
      .max(255, "La cantidad maxima de caracteres es 255"),
    lastName: Yup.string()
      .required("Requerido")
      .min(3, "Debe contener al menos 3 caracteres")
      .max(255, "La cantidad maxima de caracteres es 255"),
    aboutMe: Yup.string()
      .min(10, "Debe contener al menos 10 caracteres")
      .max(255, "La cantidad maxima de caracteres es 255"),
    nickname: Yup.string()
      .min(3, "Debe contener al menos 3 caracteres")
      .max(255, "La cantidad maxima de caracteres es 255"),
    phoneNumber: Yup.string()
      .min(3, "Debe contener al menos 3 caracteres")
      .max(255, "La cantidad maxima de caracteres es 255"),
    website: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "El website no es correcto"
    ),
  });

  const onSubmitPatchHandler = async (values: any) => {
    setLoading(true);
    await profileApi.updateData(account, values);
    alertService.success("El Perfil fue modificado", {
      keepAfterRouteChange: true,
      modal: true,
    });
    setLoading(false);
  };

  return (
    <>
      <div className="profile_container">
        {loading === true && (
          <div className="message_container">
            <div className="message">
              <Spinner />
            </div>
          </div>
        )}
        <div className="profile_photo">
          <ProfilePhoto account={account} setAccount={setAccount} />
        </div>

        <div className="profile_form">
          <div className="profile_form_shadow">
            <div className="profile_form_ico">
              <span className="text-colmena">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide">Perfil</span>
            </div>
            <div className="text-gray-700">
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmitPatchHandler}
              >
                <Form>
                  <div className="profile_form_container">
                    <div className="profile_from_group">
                      <div className="profile_form_label">Nombre</div>
                      <div className="form-input">
                        <Field id="firstName" name="firstName" />
                        <ErrorMessage name="firstName">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="profile_from_group">
                      <div className="profile_form_label">Segundo Nombre</div>
                      <div className="form-input">
                        <Field id="middleName" name="middleName" />
                        <ErrorMessage name="middleName">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="profile_from_group">
                      <div className="profile_form_label">Apellido</div>
                      <div className="form-input">
                        <Field id="lastName" name="lastName" />
                        <ErrorMessage name="lastName">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="profile_from_group">
                      <div className="profile_form_label">Nickname</div>
                      <div className="form-input">
                        <Field id="nickname" name="nickname" />
                        <ErrorMessage name="nickname">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="profile_from_group">
                      <div className="profile_form_label">Telefono</div>
                      <div className="form-input">
                        <Field id="phoneNumber" name="phoneNumber" />
                        <ErrorMessage name="phoneNumber">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="profile_from_group">
                      <div className="profile_form_label">Website</div>
                      <div className="form-input">
                        <Field id="website" name="website" />
                        <ErrorMessage name="website">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                  <div className="profile_from_full">
                    <div className="profile_from_group_full">
                      <div className="profile_form_label">Biografía</div>
                      <div className="form-input form_input_full">
                        <Field
                          id="aboutMe"
                          component="textarea"
                          name="aboutMe"
                        />
                        <ErrorMessage name="aboutMe">
                          {(msg) => <span className="error">{msg}</span>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                  <div className="profile_from_full">
                    <div className="flex justify-end py-3">
                      <Button>Guardar</Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .profile_container {
            @apply md:flex md:-mx-2  mt-4 text-sm;
          }

          .profile_photo {
            @apply w-full md:w-3/12 md:mx-2;
          }

          .profile_form {
            @apply w-full md:w-9/12 mx-2 h-64;
          }

          .profile_form_shadow {
            @apply bg-white p-3 shadow rounded-sm;
          }

          .profile_form_ico {
            @apply flex items-center space-x-2 font-semibold text-gray-900 leading-8 py-3;
          }

          .profile_form_container {
            @apply grid md:grid-cols-2;
          }

          .profile_from_group {
            @apply grid grid-cols-2;
          }

          .profile_from_full {
            @apply w-full;
          }
          .profile_from_group_full {
            @apply grid grid-cols-4;
          }

          .profile_form_label {
            @apply px-4 py-2 font-semibold;
          }

          .form-input {
            @apply px-1 py-1;
          }

          .form_input_full {
            @apply col-span-3;
          }

          .form-input > :global(input) {
            @apply block appearance-none w-full bg-white border border-gray-200 px-1 py-1 rounded;
            @apply hover:border-colmena focus:border-colmena focus:ring-colmena focus:outline-none focus:ring-1;
          }

          .form-input > :global(textarea) {
            @apply block appearance-none w-full bg-white border border-gray-200 px-1 py-1 rounded;
            @apply hover:border-colmena focus:border-colmena focus:ring-colmena focus:outline-none focus:ring-1;
          }

          .error {
            @apply text-red-700 mt-1 text-xs;
          }

          .message_container {
            @apply z-50 bg-white backdrop-blur-sm bg-opacity-90 top-0 left-0 w-screen h-screen absolute flex justify-center items-center text-sm;
          }

          .message {
            @apply m-7 py-20 flex flex-wrap content-center items-center text-sm;
          }
        `}
      </style>
    </>
  );
};
