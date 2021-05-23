import { useState } from "react";
import { ClockIcon, GlobeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
const tags = [
  { t: "React", c: "blue", w: true },
  { t: "Next.js", c: "#3498DB", w: true },
  { t: "Node", c: "#006635", w: true },
  { t: "Tailwind", c: "lightgreen", w: false },
  { t: "Prisma", c: "lightpink", w: false },
  { t: "GraphQL", c: "khaki", w: false },
];
const profiles = [
  {
    name: "Gustav Larsson",
    username: "gustavlrsn",
    avatarUrl:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F1552194%3Fv%3D4&w=64&q=75",
    text: "I'd like to pair on PairHub, very meta, I know.\n\nHappy to work on any feature in the roadmap on [GitHub](https://github.com/pairhub/pairhub)",
    tags,
    repo: "pairhub/pairhub",
    duration: 120,
    timeZone: "Europe/Stockholm",
    visibility: "full", // logged_in, with_profiles, to_matches
  },
];

export default function Home() {
  const [selectedTags, setSelectedTags] = useState([]);
  const addTag = (tag) => {
    setSelectedTags([...selectedTags, tag]);
  };
  const removeTag = (tag) => {
    setSelectedTags([...selectedTags.filter((t) => t == !tag)]);
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto px-4 py-14 pb-24">
          <div className="space-y-4 md:col-span-2">
            <h1 className="text-3xl max-w-xl font-bold">
              Find a pair programming peer
            </h1>

            <p className="text-gray-600">
              Create your own private or public profile to get automatic match
              suggestions
            </p>
          </div>
          <div>
            <div className="justify-end flex items-start">
              {/* <Link href="/get-started"> */}
              <a
                href="https://discord.gg/rwmVffUCpH"
                target="_blank"
                className="py-3 px-4 text-lg font-medium text-white bg-gray-900 hover:bg-black rounded-lg focus:outline-none"
              >
                Join Discord for early access
              </a>
              {/* </Link> */}
            </div>
          </div>

          <div className="space-y-2 md:col-span-3">
            {/* <span className="block text-sm font-semibold text-gray-500">
              Filter on technologies
            </span> */}
            <div className="flex flex-wrap space-x-2">
              {tags.map((tag) => {
                const active = selectedTags.includes(tag.t);
                return (
                  <button
                    key={tag.t}
                    onClick={() => (active ? removeTag(tag.t) : addTag(tag.t))}
                    className={
                      " rounded px-2 py-1 font-medium focus:outline-none " +
                      (active
                        ? tag.w
                          ? "text-white"
                          : "text-gray-800"
                        : "bg-gray-100 text-gray-800")
                    }
                    style={{ ...(active && { backgroundColor: tag.c }) }}
                  >
                    {tag.t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-28 max-w-screen-lg mx-auto px-4 py-14 space-y-10">
        {profiles.map((profile) => (
          <div className="bg-white border shadow rounded-lg px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 -mx-6">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center font-medium space-x-4 text-lg">
                  <img
                    className="rounded-full"
                    src={profile.avatarUrl}
                    height="56"
                    width="56"
                  />
                  <span>
                    {profile.name}
                    {"  "}
                    <span className="text-gray-500">{profile.username}</span>
                  </span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Pairing on PairHub</h2>
                  <div className="markdown">
                    <Markdown>{profile.text}</Markdown>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {/* <span className="text-sm text-gray-700 font-medium">
                  Technologies
                </span> */}
                <div className="flex flex-wrap space-x-2">
                  {tags.map((tag) => {
                    const active = selectedTags.includes(tag.t);
                    return (
                      <button
                        key={tag.t}
                        onClick={() =>
                          active ? removeTag(tag.t) : addTag(tag.t)
                        }
                        className={
                          " rounded px-2 py-1 font-medium focus:outline-none " +
                          (active
                            ? tag.w
                              ? "text-white"
                              : "text-gray-800"
                            : "bg-gray-100 text-gray-700")
                        }
                        style={{ ...(active && { backgroundColor: tag.c }) }}
                      >
                        {tag.t}
                      </button>
                    );
                  })}
                </div>
                {/* <div className="flex">
                  <div
                    className={
                      "flex items-center space-x-2 rounded px-2 py-1 font-medium focus:outline-none " +
                      "bg-gray-100 text-gray-700"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-gray-700"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span> {profile.repo}</span>
                  </div>
                </div> */}
                <div className="flex  items-center space-x-3">
                  {/* <span className="text-gray-700 text-sm font-medium">
                    Duration
                  </span> */}
                  <div className="flex items-center space-x-2 -mx-2 px-2 py-1 text-gray-500 rounded-full font-medium">
                    <ClockIcon className="h-5 w-5" />{" "}
                    <span>{profile.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 -mx-2 px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-full font-medium">
                    <GlobeIcon className="h-5 w-5" />{" "}
                    <span>{profile.timeZone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100  h-96 rounded flex items-center justify-center text-gray-500 p-6">
              Booking calendar coming soon...
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
