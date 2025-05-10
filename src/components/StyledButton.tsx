import { Button } from "@/components/ui/button";
import type { ButtonHTMLAttributes } from "react";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function StyledButton({
  children,
  ...props
}: StyledButtonProps) {
  return (
    <Button
      {...props}
      className="rounded-full bg-orange-500 hover:bg-pink-600 text-white px-6 py-2 text-lg transition-all shadow-lg"
    >
      {children}
    </Button>
  );
}
