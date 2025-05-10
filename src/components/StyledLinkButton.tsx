import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
  color?: string;
}

export default function StyledLinkButton({
  to,
  children,
    color = "bg-pink-500",
}: Props) {
  return (
    <Link
      to={to}
      className={`${color} text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:scale-105 transform transition duration-200 ease-in-out inline-block`}
    >
      {children}
    </Link>
  );
}
