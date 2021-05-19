import Head from "next/head";
import Image from "next/image";
import { signIn, useSession, getSession, signOut } from "next-auth/client";
import Dropdown from "../components/Dropdown";
import Logo from "../components/Logo";

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className="text-white">
      <header className="">
        <div className="px-4 py-4 max-w-screen-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Logo className="h-10 w-10" />
            <nav className="space-x-4">
              {/* <a href="#" className="px-4 py-3 rounded bg-black">
                Home
              </a>
              <a
                href="#"
                className="px-4 py-3 rounded bg-gray-900  hover:text-white text-gray-300"
              >
                Calendar
              </a> */}
            </nav>
          </div>

          <div className="flex items-center">
            {session?.user ? (
              <Dropdown
                items={[{ label: "Sign out", onClick: () => signOut() }]}
              >
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  className="rounded-full shadow-inner"
                />
              </Dropdown>
            ) : (
              <button
                className="px-4 py-3 rounded bg-gray-900  hover:bg-black hover:text-white text-gray-300 focus:outline-none"
                onClick={() => signIn("github")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      <div className=" max-w-screen-lg mx-auto px-4 py-14 space-y-10">
        <h1 className="text-5xl max-w-2xl font-bold">
          Become a better programmer through pair programming
        </h1>
        <button
          className="text-lg px-5 py-4 bg-black text-white rounded-md font-medium"
          onClick={() => signIn("github")}
        >
          Login with GitHub to get notified of launch
        </button>
      </div>
    </div>
  );
}
