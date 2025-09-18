import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
// Data
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!data.showResume) {
      router.push("/");
    }
  }, [router]);
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

      <div className="gradient-circle"></div>
      <div className="gradient-overlay"></div>
      <div className="gradient-circle-bottom"></div>

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
              <h1 className="text-4xl font-bold dark:text-white">{data.name}</h1>
              <h2 className="text-xl mt-5 dark:text-gray-200">{data.resume.tagline}</h2>

              {data.resume.contact && (
                <div className="mt-5 flex flex-col md:flex-row gap-4 md:gap-8 text-lg">
                  {data.resume.contact.linkedin && (
                    <a href={`https://${data.resume.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      {data.resume.contact.linkedin}
                    </a>
                  )}
                  {data.resume.contact.email && (
                    <a href={`mailto:${data.resume.contact.email}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {data.resume.contact.email}
                    </a>
                  )}
                  {data.resume.contact.phone && (
                    <a href={`tel:${data.resume.contact.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {data.resume.contact.phone}
                    </a>
                  )}
                </div>
              )}

              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold dark:text-white">Experience</h1>
                {data.resume.experiences.map(
                  ({ id, dates, type, position, bullets, location }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                      location={location}
                    ></ProjectResume>
                  )
                )}
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold dark:text-white">Education</h1>
                {data.resume.education.map((edu, index) => (
                  <div key={index} className="mt-4">
                    <h2 className="text-lg dark:text-gray-100">{edu.universityName}</h2>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h3 className="text-sm opacity-75 dark:text-gray-400">{edu.universityDate}</h3>
                      <h3 className="text-sm opacity-75 dark:text-gray-400">{edu.location}</h3>
                    </div>
                    <p className="text-sm mt-2 opacity-80 dark:opacity-100 dark:text-gray-300">{edu.degree}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-bold dark:text-white">Skills</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.resume.languages && (
                    <div className="mt-2 mob:mt-0">
                      <h2 className="text-lg font-semibold dark:text-gray-200">Languages</h2>
                      <ul className="list-disc mt-1">
                        {data.resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-1 dark:text-gray-300">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.resume.skills && (
                    <div className="mt-2 mob:mt-0">
                      <h2 className="text-lg font-semibold dark:text-gray-200">Design Skills</h2>
                      <ul className="list-disc mt-1">
                        {data.resume.skills.map((skill, index) => (
                          <li key={index} className="ml-5 py-1 dark:text-gray-300">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.resume.tools && (
                    <div className="mt-2 mob:mt-0">
                      <h2 className="text-lg font-semibold dark:text-gray-200">Tools</h2>
                      <ul className="list-disc mt-1">
                        {data.resume.tools.map((tool, index) => (
                          <li key={index} className="ml-5 py-1 dark:text-gray-300">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {data.resume.achievements && (
                <div className="mt-10">
                  <h1 className="text-2xl font-bold dark:text-white">Achievements</h1>
                  <div className="mt-4">
                    {data.resume.achievements.map((achievement, index) => (
                      <div key={index} className="mb-3">
                        <h2 className="text-lg font-semibold dark:text-gray-200">{achievement.title}</h2>
                        <p className="text-sm mt-1 opacity-80 dark:text-gray-300">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.resume.resumeLink && (
                <div className="mt-14 flex justify-center">
                  <a
                    href={data.resume.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Full Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
