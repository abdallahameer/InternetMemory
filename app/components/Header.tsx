import Link from "next/link";
import { FaMemory as MemoryIcon } from "react-icons/fa";

export default function Header() {
  return (
    <header className=" fixed flex justify-between items-center px-8 py-1 w-full bg-white shadow-md z-50">
      <div className="flex items-center gap-2">
        <MemoryIcon className="text-2xl text-pink-500" />
        <span className="text-2xl font-bold text-gray-900">InternetMemory</span>
      </div>
      <nav className="hidden md:flex gap-8 items-center">
        <a href="#features" className="text-gray-700 hover:text-gray-900">
          Features
        </a>
        <a href="#how-it-works" className="text-gray-700 hover:text-gray-900">
          How It Works
        </a>
        <Link href="/login" className="text-gray-700 hover:text-gray-900">
          Log in
        </Link>
        <Link
          href="/signup"
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Sign up
        </Link>
      </nav>
    </header>
  );
}
