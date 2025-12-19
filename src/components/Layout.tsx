import { type ReactNode } from "react";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7] bg-cover bg-center"
      style={{
        textAlign: "center",
      }}
    >
      <NavBar />
      <main className="flex-1 flex flex-col items-center w-full px-2 md:px-0">
        {children}
      </main>
    </div>
  );
}
