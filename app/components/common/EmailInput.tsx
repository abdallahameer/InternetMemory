import { MdEmail } from "react-icons/md";

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailInput({ value, onChange }: EmailInputProps) {
  return (
    <div className="relative">
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder="Email Address"
        className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-full border-2 border-transparent focus:border-blue-500 focus:outline-none transition placeholder:text-gray-500"
        required
      />
      <MdEmail className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
    </div>
  );
}
