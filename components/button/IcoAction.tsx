import { ReactElement, ReactNode } from "react";

interface ButtonInterface {
  children: ReactElement | ReactNode | string;
  onClick?: Function | undefined;
  disabled?: boolean;
}

export const IcoAction = ({
  children,
  onClick = undefined,
  disabled = false,
}: ButtonInterface) => {
  return (
    <>
      <button
        disabled={disabled}
        type="button"
        onClick={() => onClick && onClick()}
      >
        {children}
      </button>
      <style jsx>
        {`
          button {
            @apply cursor-pointer select-none hover:bg-gray-200 rounded-md flex content-center object-center p-1;
            @apply hover:border-white focus:border-white focus:ring-white focus:outline-none focus:ring-1;
            transition: opacity 0.3s ease;
          }

          button[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }

          button > :global(svg) {
          }
        `}
      </style>
    </>
  );
};
