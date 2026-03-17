interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  disabled = false,
  children,
  type = "submit",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
