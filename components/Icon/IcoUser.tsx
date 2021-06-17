export function IcoUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12.682 9.057a4.5 4.5 0 10-6.364-6.364 4.5 4.5 0 006.364 6.364zM3.932 16.056a7.875 7.875 0 0113.443 5.569H1.625c0-2.089.83-4.092 2.307-5.569z"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style jsx>{`
        svg:hover > path {
          stroke: #ffd600;
        }
      `}</style>
    </>
  );
}
