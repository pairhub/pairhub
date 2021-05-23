import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import { signIn, useSession, getSession, signOut } from "next-auth/client";
import Dropdown from "./Dropdown";
import Logo from "./Logo";

const nav = [
  {
    label: "Peers",
    href: "/",
  },
  {
    label: "Experts",
    href: "/experts",
  },
  {
    label: "Guide",
    href: "/guide",
  },
];

const classes = {
  navLink:
    "font-medium px-0 h-full hover:text-black transition-colors cursor-pointer flex items-center border-b-2",
};
export default function Layout({ children, user, loading }) {
  const router = useRouter();

  return (
    <div className="">
      <header className="sticky top-0 bg-white shadow-sm border-b h-14">
        <div className="px-2 md:px-4 max-w-screen-lg mx-auto flex items-center justify-between">
          <div className="flex space-x-4 md:space-x-8">
            <Link href="/">
              <a className="bg-gray-900">
                <Logo className="h-14 w-14 p-3" loading={loading} />
              </a>
            </Link>
            <nav className="flex h-14 items-stretch space-x-2 md:space-x-6">
              {nav.map((i) => (
                <Link href={i.href}>
                  <a
                    className={
                      classes.navLink +
                      (router.asPath === i.href
                        ? " border-gray-900 text-gray-900"
                        : " border-transparent text-gray-600")
                    }
                  >
                    {i.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <Tippy content="Thank you for feeding the algorithm" arrow={false}>
              <div className="px-2 sm:px-4 h-7">
                <a
                  className="github-button"
                  href="https://github.com/pairhub/pairhub"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star pairhub/pairhub on GitHub"
                >
                  Star
                </a>
              </div>
            </Tippy>

            {user ? (
              // negative margin hack to fix Next.js Image component bug of extra 6 pixels in height
              <div className="-mb-1.5">
                <Dropdown
                  items={[{ label: "Sign out", onClick: () => signOut() }]}
                >
                  <Image
                    src={user.image}
                    width={32}
                    height={32}
                    className="rounded-full shadow-inner"
                  />
                </Dropdown>
              </div>
            ) : (
              <button
                className="py-3 font-medium text-gray-600 hover:text-black focus:outline-none"
                onClick={() => signIn("github")}
              >
                Login with GitHub
              </button>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
