import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navigation for Work and About buttons
  const handleWorkClick = () => {
    if (handleWorkScroll) {
      handleWorkScroll();
    } else {
      // Navigate to home page and scroll to work section
      router.push('/#work');
    }
  };

  const handleAboutClick = () => {
    if (handleAboutScroll) {
      handleAboutScroll();
    } else {
      // Navigate to home page and scroll to about section
      router.push('/#about');
    }
  };

  return (
    <>
      <Popover className="block tablet:hidden mt-5 sticky top-0 z-20 w-full">
        {({ open }) => (
          <>
            <div className={`${
              theme === "light" ? "bg-white/20 backdrop-blur-md" : "bg-black/20 backdrop-blur-md"
            } w-full py-3`}>
              <div className="container mx-auto flex items-center justify-between px-4">
              <h1
                onClick={() => router.push("/")}
                className="font-medium text-xl laptop:text-2xl p-2 laptop:p-0 link"
              >
                {name}
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      alt={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                      className="h-6"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                    />
                  </Button>
                )}

                <Popover.Button>
                  <img
                    alt="Toggle menu"
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  />
                </Popover.Button>
              </div>
            </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1">
                <Button onClick={handleWorkClick}>Work</Button>
                <Button onClick={handleAboutClick}>About</Button>
                {showResume && (
                  <Button
                    onClick={() => router.push("/resume")}
                    classes="first:ml-1"
                  >
                    Resume
                  </Button>
                )}
                <Button
                  onClick={() => window.open(data.socials.find(s => s.title === "Email")?.link || "mailto:default@example.com")}
                >
                  Contact
                </Button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden sticky ${
          theme === "light" ? "bg-white/20 backdrop-blur-md" : "bg-black/20 backdrop-blur-md"
        } dark:text-white top-0 z-20 tablet:flex py-3 w-full`}
      >
        <div className="container mx-auto flex flex-row items-center justify-between px-4">
          <h1
            onClick={() => router.push("/")}
            className="font-medium text-xl laptop:text-2xl cursor-pointer mob:p-2 laptop:p-0"
          >
            {name}
          </h1>
          <div className="flex">
          <Button onClick={handleWorkClick}>Work</Button>
          <Button onClick={handleAboutClick}>About</Button>
          {showResume && (
            <Button
              onClick={() => router.push("/resume")}
              classes="first:ml-1"
            >
              Resume
            </Button>
          )}
          <Button
            onClick={() => window.open(data.socials.find(s => s.title === "Email")?.link || "mailto:default@example.com")}
          >
            Contact
          </Button>
          {mounted && theme && data.darkMode && (
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <img
                alt={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="h-6"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
              />
            </Button>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
