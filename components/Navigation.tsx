"use client";

import { Home, Compass, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "home", label: "Trang chủ", icon: Home },
  { id: "explore", label: "Khám phá", icon: Compass },
  { id: "profile", label: "Hồ sơ", icon: User },
];

export default function Navigation() {
  const [active, setActive] = useState("home");

  return (
    <>
      <aside
        className="hidden md:flex fixed top-0 left-0 z-50
                   h-screen w-20 lg:w-60
                   flex-col items-center lg:items-stretch
                   bg-zinc-950 border-r border-zinc-800
                   py-6 px-2 lg:px-4"
      >
        <div className="mb-8 px-2 text-2xl font-bold">
          <span className="hidden lg:inline">VidFeed</span>
          <span className="lg:hidden">VF</span>
        </div>

        <nav className="flex w-full flex-col gap-2">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-4 rounded-lg
                            px-3 py-3 transition-colors
                            ${
                              isActive
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                            }`}
              >
                <Icon size={26} />
                <span className="hidden lg:inline font-medium">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50
                   flex h-16 items-center justify-around
                   bg-zinc-950/95 backdrop-blur border-t border-zinc-800"
      >
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex h-full flex-1 flex-col items-center justify-center gap-0.5
                          transition-colors
                          ${isActive ? "text-white" : "text-zinc-500"}`}
            >
              <Icon size={22} />
              <span className="text-[11px]">{label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}