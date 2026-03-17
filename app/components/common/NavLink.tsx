import Link from "next/link";

interface NavLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export default function NavLink({ text, linkText, href }: NavLinkProps) {
  return (
    <p className="text-center text-gray-600 mt-4">
      {text}{" "}
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        {linkText}
      </Link>
    </p>
  );
}
