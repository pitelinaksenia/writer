export default function TextButton({ label, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}
