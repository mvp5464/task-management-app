export default function CrossIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.7583 17.2426L12.0009 12M12.0009 12L17.2435 6.75732M12.0009 12L6.7583 6.75732M12.0009 12L17.2435 17.2426"
        stroke="#797979"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
