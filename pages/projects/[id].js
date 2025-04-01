import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import Head from "next/head";
import data from "../../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";

// Helper function to render text and image placeholders
const RenderContentWithImages = ({ content, projectId }) => {
  if (!content) return null;

  // Regex to match placeholders like [[Image: filename.ext]]
  const placeholderRegex = /\[\[Image: (.*?)\]\]/g;
  const parts = content.split(placeholderRegex);

  return parts.map((part, index) => {
    // Even indices are text, odd indices are image filenames captured by regex
    if (index % 2 === 0) {
      // Render text segment, preserving line breaks
      return (
        <p key={`text-${index}`} className="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line mb-4">
          {part}
        </p>
      );
    } else {
      // Render image using the captured filename directly
      const filename = part; // Use the captured part as the filename
      const imageDesc = filename.split('.')[0]; // Basic description from filename
      const imagePath = `/images/project${projectId}/${filename}`;
      return (
        <div key={`image-${index}`} className="my-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <img
            src={imagePath}
            alt={imageDesc} // Use derived description for alt text
            className="w-full h-auto object-contain rounded-lg shadow-md max-h-[70vh]"
            // Add onError handler maybe? To show placeholder if image fails
          />
          <p className="text-sm text-center italic opacity-70 mt-3 dark:text-gray-400">{imageDesc.replace(/-/g, ' ')}</p> {/* Display cleaner description */}
        </div>
      );
    }
  });
};

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const project = data.projects.find((p) => p.id === id);
  
  // Refs for animations
  const titleRef = useRef();
  const descriptionRef = useRef();
  const roleRef = useRef();
  const techStackRef = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger(
      [titleRef.current, descriptionRef.current, roleRef.current, techStackRef.current].filter(Boolean),
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, [project]);

  if (!project) return <div>Loading project or project not found...</div>;

  return (
    <div className={`relative ${data.showCursor && "cursor-none"} dark:text-white`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{`${project.title} - ${data.name}`}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header />
        
        {/* Hero Section */}
        <div className="mt-20">
          <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
            <img
              src={project.imageSrc}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-20 flex flex-col gap-10 px-4 md:px-0">
          {/* Top Section: Title, Description, Role, Tech Stack */}
          <div className="grid grid-cols-1 laptop:grid-cols-3 gap-10">
            <div className="laptop:col-span-2">
              <h1 ref={titleRef} className="text-4xl font-bold mb-4 dark:text-white">
                {project.title}
              </h1>
              <p ref={descriptionRef} className="text-xl opacity-70 mb-8 dark:text-gray-300 whitespace-pre-line">
                {project.description}
              </p>
            </div>
            <div className="laptop:col-span-1">
               <div ref={roleRef} className="mb-8">
                 <h2 className="text-2xl font-semibold mb-2 dark:text-white">Role</h2>
                 <p className="text-lg dark:text-gray-300">{project.role}</p>
               </div>
               <div ref={techStackRef} className="mb-8">
                 <h2 className="text-2xl font-semibold mb-4 dark:text-white">Tech Stack</h2>
                 <div className="flex flex-wrap gap-2">
                   {project.techStack?.map((tech, index) => (
                     <span
                       key={index}
                       className="px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full"
                     >
                       {tech}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* New Detailed Sections */}
          {/* Problem Statement */}
          {project.problemStatement && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Problem</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line">{project.problemStatement}</p>
            </div>
          )}

          {/* Solution Statement */}
          {project.solutionStatement && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Solution</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line">{project.solutionStatement}</p>
            </div>
          )}

          {/* Design Process Overview */}
          {project.designProcessOverview && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Design Process</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line">{project.designProcessOverview}</p>
            </div>
          )}

          {/* Empathize Phase */}
          {project.empathizePhase && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Empathize</h2>
              <RenderContentWithImages content={project.empathizePhase} projectId={project.id} />
            </div>
          )}

          {/* Define Phase */}
          {project.definePhase && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Define</h2>
              <RenderContentWithImages content={project.definePhase} projectId={project.id} />
            </div>
          )}

          {/* Ideate Phase */}
          {project.ideatePhase && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Ideate</h2>
              <RenderContentWithImages content={project.ideatePhase} projectId={project.id} />
            </div>
          )}

          {/* Design Phase */}
          {project.designPhase && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Design</h2>
              <RenderContentWithImages content={project.designPhase} projectId={project.id} />
            </div>
          )}

          {/* Testing Phase */}
          {project.testingPhase && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white border-b pb-2">Testing & Future Improvements</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line">{project.testingPhase}</p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
} 