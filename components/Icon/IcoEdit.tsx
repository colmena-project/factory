export function IcoEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M8 4H3a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L8.828 14H6v-2.828l8.586-8.586z"
          stroke="#4CB5AB"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
