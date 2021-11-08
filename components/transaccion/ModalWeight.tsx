import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

export const ModalWeight = ({
  title,
  handleClickClose,
  handleClickSave,
}: {
  title: string;
  handleClickClose: MouseEventHandler<HTMLButtonElement>;
  handleClickSave: Function;
}): JSX.Element => {
  const inputEl = useRef<HTMLInputElement>(null);

  const saveAndClose = () => {
    handleClickSave(inputEl.current.value);
  };

  return (
    <>
      <div className="modal">
        <div className="modal_content">
          <div className="modal_content_inner">{title}</div>
          <div className=" model_content_weitght ">
            <div className=" model_content_weitght_wrapper">
              <input ref={inputEl} type="number" step="0.005" />
            </div>
          </div>

          <div className="flex justify-around pt-2">
            <button onClick={handleClickClose} className="modal_close ">
              CANCELAR
            </button>
            <button onClick={saveAndClose} className="modal_close ">
              ACEPTAR
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            @apply fixed top-0 left-0 h-screen w-screen z-50 bg-gray-50 bg-opacity-30 overflow-hidden flex flex-row justify-center items-center;
          }
          .modal_content {
            @apply bg-white  text-left py-4 px-6 md:m-10 md:w-6/12 w-full shadow-md;
          }

          .modal_content_inner {
            @apply flex text-base justify-between items-center pb-3;
          }

          .model_content_weitght {
            @apply flex justify-center items-center w-full overflow-y-auto h-60;
          }

          .model_content_weitght_wrapper input {
            @apply text-7xl  text-colmena w-full text-center;
          }

          .modal_action {
            @apply px-4 bg-transparent p-3 rounded-lg text-colmena hover:bg-gray-100 hover:text-colmena-dark mr-2 flex flex-row justify-center items-center;
          }

          .modal_action span {
            @apply ml-1;
          }

          .modal_close {
            @apply p-1 rounded-lg text-colmena text-lg hover:bg-gray-200;
          }
        `}
      </style>
    </>
  );
};
