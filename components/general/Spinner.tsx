import { ReactElement } from "react";

export const Spinner = ({
  children = undefined,
  fullPage = false,
}: {
  children?: ReactElement | undefined;
  fullPage?: boolean;
}) => {
  return (
    <>
      <div
        className={
          fullPage
            ? "message_full_container message_container"
            : "message_container"
        }
      >
        <div className="loading ">
          <div className="loading-spiner">
            <div className="spinner"></div>
            {children && children}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .message_container {
            @apply absolute top-0 left-0 w-screen h-screen flex justify-center items-center text-sm;
            animation: fadeIn linear 7s;
            animation: fadeOut linear 7s;
          }

          .message_full_container .loading {
            @apply m-1 p-1 h-screen bg-white bg-opacity-75 items-center;
          }
          .loading {
            @apply w-screen m-7 p-12 z-10 flex justify-center backdrop-blur backdrop-opacity-5;
          }

          .loading-spiner {
            @apply p-10 flex items-center justify-center bg-white h-64 md:w-4/6 xs:w-full bg-opacity-75 rounded;
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #14b8a6;
            animation: spin 1s ease infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};
