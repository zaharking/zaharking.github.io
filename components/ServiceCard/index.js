import React from "react";

const ServiceCard = ({ name, description }) => {
  return (
    <div
      className="w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 
      hover:bg-slate-50 dark:hover:bg-gray-800 
      hover:scale-105 link"
    >
      <h1 className="text-3xl dark:text-white">{name ? name : "Heading"}</h1>
      <p className="mt-5 text-xl opacity-40 dark:opacity-70 dark:text-gray-300">
        {description
          ? description
          : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "}
      </p>
    </div>
  );
};

export default ServiceCard;
