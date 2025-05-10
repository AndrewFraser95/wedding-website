import { ReactNode } from "react";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('assets/kettlesing.avif')`,
        textAlign: "center"
      }}
    >
      <div className="bg-white/80 flex-1">
        <NavBar />
        <div className="max-w-2xl mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
