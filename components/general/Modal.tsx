import { useRef, useState } from "react";
import { Button } from "../button";

const Modal = ({
  title,
  action,
  closeModal,
  buttonText,
}: {
  title: string;
  action: Function;
  closeModal: Function;
  buttonText: string;
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();

  const actionButton = (value: string) => {
    if (value === "") {
      return setHasError(true);
    }
    setHasError(false);
    action(value);
    closeModal();
  };

  return (
    <>
      <div className="container_modal">
        <div className="modal">
          <h4 className="modal_title">{title}</h4>
          <input type="text" className="modal_input" ref={inputRef} />
          {hasError && <span className="error">Debe ingresar un valor</span>}

          <div className="modal_actions">
            <div className="modal_action">
              <Button
                typeButton={"button"}
                type={"secundary"}
                onClick={closeModal}
              >
                Cerrar
              </Button>
            </div>
            <div className="modal_action">
              <Button
                typeButton={"button"}
                onClick={() => {
                  actionButton(inputRef.current.value);
                }}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container_modal {
            @apply w-screen h-full absolute visible block bg-gray-400 bg-opacity-50 top-0 left-0 right-0 min-h-screen;
          }

          .modal {
            @apply m-0 w-1/3 relative z-50 top-1/3 left-1/3 border-colmena p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg;
            animation: fadeIn linear 5s;
            animation: fadeOut linear 5s;
          }
          .modal_title {
            @apply w-full font-bold text-gray-800 block mb-2;
          }
          .modal_input {
            @apply block appearance-none w-full bg-white border border-gray-200 px-2 py-2 rounded;
            @apply hover:border-colmena focus:border-colmena focus:ring-colmena focus:outline-none focus:ring-2;
          }

          .error {
            @apply text-red-700 mt-1 text-xs;
          }

          .modal_actions {
            @apply mt-2 flex content-evenly w-full flex-row items-stretch;
          }

          .modal_action {
            @apply mr-20 ml-4;
            min-width: 140px;
          }
        `}
      </style>
    </>
  );
};

export default Modal;
