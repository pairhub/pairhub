import Head from "next/head";
import Image from "next/image";
import { signIn, useSession, getSession, signOut } from "next-auth/client";
import Dropdown from "../components/Dropdown";
import Logo from "../components/Logo";

export default function Home() {
  const [session] = useSession();
  return (
    <div className="text-white">
      <header className="">
        <div className="px-4 py-6 max-w-screen-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Logo className="h-10 w-10" />
            <nav className="space-x-4">{/* nav */}</nav>
          </div>

          <div className="flex items-center">
            {session?.user ? (
              <Dropdown
                items={[{ label: "Sign out", onClick: () => signOut() }]}
              >
                <div className="-mb-1.5">
                  <Image
                    src={session?.user.image}
                    width={40}
                    height={40}
                    className="rounded-full shadow-inner"
                  />
                </div>
              </Dropdown>
            ) : (
              <button
                className="px-4 py-2 rounded bg-gray-900  hover:bg-black hover:text-white text-gray-300 focus:outline-none"
                onClick={() => signIn("github")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      <div className=" max-w-screen-lg mx-auto px-4 py-14 space-y-10">
        <h1 className="text-5xl max-w-lg font-bold">
          Have you tried remote pair programming?
        </h1>
        <div className="space-y-4 max-w-lg">
          <p className="text-gray-300 text-xl">
            It makes coding a little bit more human.
          </p>
          <p className="text-gray-300 text-xl">
            PairHub will help you find people and projects to pair on.
          </p>
          <p className="text-gray-300 text-xl">
            Re-launching summer 2021, sign up below to get notified and{" "}
            <a
              className="text-white underline"
              href="https://discord.gg/rwmVffUCpH"
              target="_blank"
            >
              join the Discord community
            </a>{" "}
            in the meanwhile.
          </p>
        </div>
        {session?.user ? (
          <div className="text-lg font-medium">
            Thanks for signing up, you will be notified on launch!
          </div>
        ) : (
          <button
            className="text-lg px-5 py-4 bg-black hover:bg-gray-800 transition-colors text-white rounded-md font-medium focus:outline-none"
            onClick={() => signIn("github")}
          >
            Login with GitHub to get notified of launch
          </button>
        )}
      </div>
    </div>
  );
}
