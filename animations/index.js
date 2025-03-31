import gsap, { Power3 } from "gsap";

export const stagger = (target, fromvVars, toVars) => {
  // Filter out any null or undefined elements
  const validTargets = Array.isArray(target) 
    ? target.filter(element => element !== null && element !== undefined)
    : target;

  // If no valid targets, return early
  if (!validTargets || (Array.isArray(validTargets) && validTargets.length === 0)) {
    return;
  }

  try {
    return gsap.fromTo(
      validTargets,
      { opacity: 0, ...fromvVars },
      { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
    );
  } catch (error) {
    console.warn("GSAP animation error:", error);
    return null;
  }
};
