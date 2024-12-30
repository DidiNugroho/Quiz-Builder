"use client";

import { createClient } from "@/db/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return;
    }

    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link href="/en/quiz-home" className="max-sm:hidden">
          <p className="text-2xl">Quiz Builder</p>
        </Link>
        <Link href="/en/quiz-home" className="hidden max-sm:block">
          <p className="text-2xl">Quiz Builder</p>
        </Link>
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link href="/en/quiz-home">
                <p className="text-2xl">Quiz Builder</p>
              </Link>
            </li>
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <Link
                href="/en/quiz-home"
                className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
              >
                Home
              </Link>
            </li>
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <Link
                href="/en/dashboard"
                className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex max-lg:ml-auto space-x-4">
          <LanguageToggle />
          {!user ? (
            <>
              <Link href={"/en/login"}>
                <button className="px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300">
                  Login
                </button>
              </Link>
              <Link href={"/en/register"}>
                <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4 max-lg:ml-auto">
              <span className="text-sm font-medium text-gray-700">
                Welcome, {user.email}
              </span>
              <button
                onClick={handleSignout}
                className="px-4 py-2 text-sm rounded-full font-bold bg-red-500 text-white-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300"
              >
                Logout
              </button>
            </div>
          )}
          <button id="toggleOpen" className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
