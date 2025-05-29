import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  const router = useRouter();

  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = router.asPath.split('#')[1];
      if (hash === 'work' && workRef.current) {
        setTimeout(() => {
          workRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === 'about' && aboutRef.current) {
        setTimeout(() => {
          aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    if (router.isReady) {
      handleHashNavigation();
    }
  }, [router.isReady, router.asPath]);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5 text-center">
            <h1
              ref={textOne}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold mx-auto"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold mx-auto"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold mx-auto"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-1 tablet:p-2 text-bold mx-auto"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5 flex justify-center" />
        </div>
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef} id="work">
          <h1 className="text-2xl text-bold p-2 laptop:p-0">Work</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.filter(project => !project.hidden).map((project) => (
              <WorkCard
                key={project.id}
                id={project.id}
                img={project.imageSrc}
                workCardImageSrc={project.workCardImageSrc}
                name={project.title}
                description={project.description}
                role={project.role}
                techStack={project.techStack}
                explanation={project.explanation}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold p-2 laptop:p-0">Services</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef} id="about">
          <h1 className="text-2xl text-bold p-2 laptop:p-0">About</h1>
          <p className="mt-5 p-2 laptop:p-0 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
