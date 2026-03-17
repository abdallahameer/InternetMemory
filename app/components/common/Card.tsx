interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-8 w-full w-full ${className}`}
    >
      {children}
    </div>
  );
}
