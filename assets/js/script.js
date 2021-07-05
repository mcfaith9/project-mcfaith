let t1 = gsap.timeline();

t1.from(".mcfloat", {
  opacity: 0,
  xPercent: -100,
  delay: 0.5,
  duration: 1,
  ease: "power1.out",
  yoyo: true,
});
t1.from(
  ".dot",
  {
    opacity: 0,
    yPercent: 100,
    delay: 0.5,
    repeatDelay: 1,
    duration: 1,
    ease: "power1.out",
  },
  0.01
);

t1.to(".dot", {
  x: 20,
  duration: 1,
  ease: "power1.out",
});

t1.to(".dot", {
  x: -10,
  duration: 0.5,
  ease: "power1.out",
});

t1.to(".mcfloat", {
  opacity: 0,
  xPercent: -100,
  duration: 1,
  ease: "power1.out",
  yoyo: true,
});

t1.to(
  ".dot",
  {
    opacity: 0,
    duration: 1,
    ease: "expo.out",
  },
  3
);

t1.to(
  ".cover",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3
);

t1.to(
  ".cover-2",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3.2
);

t1.to(
  ".cover-3",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3.4
);

t1.to(
  ".cover-4",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3.6
);

t1.from(".cover-5", {
  yPercent: -100,
  duration: 1,
  ease: "power1.out",
  delay: 0.4,
});

t1.from(".logo", {
  xPercent: -100,
  opacity: 0,
  duration: 1,
  ease: "power1.out",
});

t1.from(
  ".item",
  {
    xPercent: 100,
    opacity: 0,
    duration: 1,
    ease: "power1.out",
    stagger: {
      amount: 0.5,
      from: "left",
    },
  },
  6
);

t1.from(
  ".header-img",
  {
    xPercent: -100,
    opacity: 0,
    duration: 1,
    ease: "power1.out",
  },
  6.2
);

t1.from(
  ".heading",
  {
    xPercent: 100,
    opacity: 0,
    duration: 1,
    ease: "power1.out",
  },
  6.2
);

t1.from(
  ".sub-heading",
  {
    xPercent: 100,
    opacity: 0,
    duration: 1.1,
    ease: "power1.out",
  },
  6.2
);

t1.from(
  ".tools",
  {
    xPercent: 100,
    opacity: 0,
    duration: 1.1,
    ease: "power1.out",
  },
  6.2
);

t1.from(
  ".button",
  {
    yPercent: 100,
    opacity: 0,
    duration: 2,
    ease: "bounce",
  },
  6.5
);

const body = document.querySelector("body");
const img = document.querySelector(".header-img");