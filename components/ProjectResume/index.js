import React from "react";

const ProjectResume = ({ dates, type, position, bullets }) => {
  const [bulletsLocal, setBulletsLocal] = React.useState(bullets.split(","));

  return (
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between dark:text-white">
      <div className="text-lg w-2/5">
        <h2 className="dark:text-white">{dates}</h2>
        <h3 className="text-sm opacity-50 dark:text-gray-400">{type}</h3>
      </div>
      <div className="w-3/5">
        <h2 className="text-lg font-bold dark:text-white">{position}</h2>
        {bulletsLocal && bulletsLocal.length > 0 && (
          <ul className="list-disc ml-4">
            {bulletsLocal.map((bullet, index) => (
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
