import { ReactElement, ReactNode } from "react";

interface ButtonInterface {
  children: ReactElement | ReactNode | string;
  disabled?: boolean;
  onClick?: Function | undefined;
  typeButton?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  disabled = false,
  onClick = undefined,
  typeButton = "submit",
}: ButtonInterface) => {
  return (
    <>
      <button type={typeButton} disabled={disabled} onClick={() => onClick}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            @apply select-none cursor-pointer bg-colmena text-white font-bold py-2 px-4 rounded;
            @apply hover:border-green-600 hover:bg-colmena-dark  focus:border-white focus:ring-white focus:outline-none focus:ring-1;
            transition: opacity 0.3s ease;
            min-width: 140px;
            height: 34px;
          }

          button[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }

          button > :global(svg) {
            margin-right: 8px;
          }
        `}
      </style>
    </>
  );
};
