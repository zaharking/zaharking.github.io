import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import Head from "next/head";
import data from "../../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const project = data.projects.find((p) => p.id === id);
  
  // Refs for animations
  const titleRef = useRef();
  const descriptionRef = useRef();
  const roleRef = useRef();
  const techStackRef = useRef();
  const explanationRef = useRef();
  const challengesRef = useRef();
  const resultsRef = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger(
      [titleRef.current, descriptionRef.current, roleRef.current, techStackRef.current, explanationRef.current, challengesRef.current, resultsRef.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  if (!project) return null;

  return (
    <div className={`relative ${data.showCursor && "cursor-none"} dark:text-white`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{project.title} - {data.name}</title>
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
        <div className="mt-20 grid grid-cols-1 laptop:grid-cols-2 gap-10">
          {/* Left Column - Main Info */}
          <div>
            <h1 ref={titleRef} className="text-4xl font-bold mb-4 dark:text-white">
              {project.title}
            </h1>
            <p ref={descriptionRef} className="text-xl opacity-70 mb-8 dark:text-gray-300">
              {project.description}
            </p>
            
            <div ref={roleRef} className="mb-8">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">Role</h2>
              <p className="text-lg dark:text-gray-300">{project.role}</p>
            </div>

            <div ref={techStackRef} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
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

          {/* Right Column - Project Details */}
          <div>
            <div ref={explanationRef} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Project Overview</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300">{project.explanation}</p>
            </div>

            <div ref={challengesRef} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Challenges</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300">{project.challenges}</p>
            </div>

            <div ref={resultsRef} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Results</h2>
              <p className="text-lg leading-relaxed dark:text-gray-300">{project.results}</p>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        {project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-8 dark:text-white">Project Gallery</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance] box-border">
              {project.additionalImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative break-inside-avoid mb-4 rounded-lg overflow-hidden group"
                >
                  <img
                    src={image.url}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
                      <p className="text-white text-lg">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
} 