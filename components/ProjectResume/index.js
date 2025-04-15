import React from "react";

const ProjectResume = ({ dates, type, position, bullets, location }) => {
  // Check if bullets is an array, otherwise handle as string for backward compatibility
  const bulletsArray = Array.isArray(bullets) ? bullets : bullets.split(",");

  return (
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between dark:text-white">
      <div className="text-lg w-2/5">
        <h2 className="dark:text-white">{dates}</h2>
        <h3 className="text-sm opacity-50 dark:text-gray-400">{type}</h3>
        {location && <h3 className="text-sm opacity-70 dark:text-gray-400 mt-1">{location}</h3>}
      </div>
      <div className="w-3/5">
        <h2 className="text-lg font-bold dark:text-white">{position}</h2>
        {bulletsArray && bulletsArray.length > 0 && (
          <ul className="list-disc ml-4">
            {bulletsArray.map((bullet, index) => (
              <li key={index} className="text-sm my-1 opacity-70 dark:text-gray-300">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectResume;
