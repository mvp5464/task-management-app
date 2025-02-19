export default function DownloadIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 33.8335H30"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9998 7.1665V27.1665M19.9998 27.1665L25.8332 21.3332M19.9998 27.1665L14.1665 21.3332"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
