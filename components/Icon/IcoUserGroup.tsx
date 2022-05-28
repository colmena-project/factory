export function IcoUserGrup(props: React.SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg
        width={24}
        height={26}
        viewBox="0 0 32 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          className="icon"
          d="M23.5 25H31v-3a4.5 4.5 0 00-8.034-2.785M23.5 25h-15m15 0v-3c0-.984-.189-1.924-.534-2.785m0 0a7.503 7.503 0 00-13.932 0M8.5 25H1v-3a4.5 4.5 0 018.034-2.785M8.5 25v-3c0-.984.189-1.924.534-2.785M20.5 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm9 4.5a3 3 0 11-6 0 3 3 0 016 0zm-21 0a3 3 0 11-6 0 3 3 0 016 0z"
          stroke="#FFFFFF"
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
