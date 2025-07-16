import { FaGithub, FaGlobe } from "react-icons/fa";

const socials = [
  {
    icon: <FaGithub />,
    url: "https://github.com/ctrlvitor",
  },
  {
    icon: <FaGlobe />,
    url: "",
  },
];

export const SocialIcons = () => (
  <div className="w-full max-w-[200px] sm:max-w-none flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-2 text-[1.5rem] sm:text-[1.65rem] md:text-[1.75rem]">
    {socials.map((s, i) => (
      <a
        key={i}
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 ease-in-out text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white"
      >
        <span className="transition duration-300 hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
          {s.icon}
        </span>
      </a>
    ))}
  </div>
);
