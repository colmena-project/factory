import { ReactElement, ReactNode } from "react";

interface ButtonInterface {
  children: ReactElement | ReactNode | string;
  disabled?: boolean;
  onClick?: Function | undefined;
  type?: "primary" | "secundary";
  typeButton?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  disabled = false,
  onClick = undefined,
  typeButton = "submit",
  type = "primary",
}: ButtonInterface) => {
  return (
    <>
      <>
        {onClick ? (
          <button
            className={type}
            type={typeButton}
            disabled={disabled}
            onClick={() => onClick()}
          >
            {children}
          </button>
        ) : (
          <button className={type} type={typeButton} disabled={disabled}>
            {children}
          </button>
        )}
      </>
      <style jsx>
        {`
          button {
            @apply select-none cursor-pointer py-2 px-4 rounded text-sm;
            @apply focus:outline-none focus:ring-1;
            transition: opacity 0.3s ease;
            min-width: 140px;
            height: 34px;
          }

          button.primary {
            @apply bg-colmena text-white;
            @apply hover:border-green-600 hover:bg-colmena-dark  focus:border-white focus:ring-white;
          }

          button.secundary {
            @apply bg-gray-300 text-gray-900;
            @apply hover:border-gray-600 hover:bg-gray-400   focus:border-white focus:ring-white;
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
