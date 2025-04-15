import React from "react";
import Link from "next/link";

const WorkCard = ({ img, workCardImageSrc, name, description, id, role, techStack, explanation }) => {
  // Use workCardImageSrc if available, otherwise fallback to img (imageSrc)
  const imageToUse = workCardImageSrc || img;
  
  return (
    <Link href={`/projects/${id}`}>
      <div
        className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link cursor-pointer dark:text-white group"
      >
        <div
          className="relative rounded-lg overflow-hidden transition-all ease-out duration-300"
        >
          <div className="aspect-square w-full">
            <img
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={imageToUse}
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>
        <h1 className="mt-5 text-3xl font-medium dark:text-white">
          {name ? name : "Project Name"}
        </h1>
        <h2 className="text-xl opacity-50 dark:text-gray-400">
          {description ? description : "Description"}
        </h2>
        {role && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Role: {role}
          </p>
        )}
        {techStack && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills & Tools:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {techStack.map((tech, index) => (
                <span key={index} className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 dark:text-white rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {explanation && (
          <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
            {explanation}
          </p>
        )}
      </div>
    </Link>
  );
};

export default WorkCard;
