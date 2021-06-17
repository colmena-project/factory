import * as React from "react";

export const IcoArrow = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.5 8.75L36.75 21m0 0L24.5 33.25M36.75 21H5.25"
        stroke="#6FCF97"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
