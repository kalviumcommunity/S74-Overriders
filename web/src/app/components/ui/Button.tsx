interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
}
