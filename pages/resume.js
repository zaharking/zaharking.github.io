import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
// Data
import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Resume
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        } ${theme.theme === "dark" ? "dark" : ""}`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className="w-full bg-white dark:bg-gray-900 max-w-4xl p-10 mob:p-5 desktop:p-16 rounded-lg shadow-sm dark:border dark:border-gray-700"
            >
              <h1 className="text-3xl font-bold dark:text-white">{name}</h1>
              <h2 className="text-xl mt-5 dark:text-gray-200">{resume.tagline}</h2>
              <h2 className="w-full md:w-4/5 text-xl mt-5 opacity-70 dark:opacity-100 dark:text-gray-400">
                {resume.description}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold dark:text-white">Experience</h1>
                {resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold dark:text-white">Education</h1>
                <div className="mt-4">
                  <h2 className="text-lg dark:text-gray-100">{resume.education.universityName}</h2>
                  <h3 className="text-sm opacity-75 dark:text-gray-400">
                    {resume.education.universityDate}
                  </h3>
                  <p className="text-sm mt-2 opacity-60 dark:opacity-100 dark:text-gray-400">
                    {resume.education.universityPara}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold dark:text-white">Skills</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resume.languages && (
                    <div className="mt-2 mob:mt-0">
                      <h2 className="text-lg font-semibold dark:text-gray-200">Languages</h2>
                      <ul className="list-disc mt-1">
                        {resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-1 dark:text-gray-300">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.frameworks && (
                    <div className="mt-2 mob:mt-0">
                      <h2 className="text-lg font-semibold dark:text-gray-200">Frameworks</h2>
                      <ul className="list-disc mt-1">
                        {resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-1 dark:text-gray-300">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.others && (
                    <div className="mt-2 mob:mt-0">
                      <h2 className="text-lg font-semibold dark:text-gray-200">Others</h2>
                      <ul className="list-disc mt-1">
                        {resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-1 dark:text-gray-300">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
