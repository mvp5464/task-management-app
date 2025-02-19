export default function StarIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.58737 7.23597L10.1849 2.00376C10.5183 1.33208 11.4817 1.33208 11.8151 2.00376L14.4126 7.23597L20.2215 8.08017C20.9668 8.18848 21.2638 9.0994 20.7243 9.6219L16.5217 13.6918L17.5135 19.4414C17.6409 20.1798 16.8614 20.7428 16.1945 20.3941L11 17.678L5.80547 20.3941C5.1386 20.7428 4.35909 20.1798 4.48645 19.4414L5.47825 13.6918L1.27575 9.6219C0.736172 9.0994 1.03322 8.18848 1.77852 8.08017L7.58737 7.23597Z"
        stroke="#797979"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
