"use strict";

const navContainer = document.querySelector(".nav-container");
const linksContainer = document.querySelector(".links-container");
const home = document.querySelector(".home-page");
const feature = document.querySelector(".feature");
const opration = document.querySelector(".opration");
const sliders = document.querySelector(".sliders");

// scroll smooth
linksContainer.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) return;

  e.target.getAttribute("feature") === "feature" &&
    feature.scrollIntoView({ behavior: "smooth" });

  e.target.getAttribute("opration") === "opration" &&
    opration.scrollIntoView({ behavior: "smooth" });

  e.target.getAttribute("sliders") === "sliders" &&
    sliders.scrollIntoView({ behavior: "smooth" });
});

// nav fixed : position
const navCallback = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navContainer.classList.add("nav-container-fixed");
  } else {
    navContainer.classList.remove("nav-container-fixed");
  }
};

const navOption = {
  root: null,
  rootMargin: "-100px",
  threshold: 0,
};

const inteObserver = new IntersectionObserver(navCallback, navOption);

inteObserver.observe(home);

// opration btns
const btnOprationContainer = document.querySelector(".btn-opration-container");
const btnContent = document.querySelectorAll(".btn-content");
const oprationContents = document.querySelectorAll(".opration-content");

oprationContents.forEach((content, i) => {
  if (i === 0) content.style.opacity = "1";
  else content.style.opacity = "0";
});

btnContent.forEach((btn, i) => {
  if (i === 0) btn.style.transform = "translateY(10px)";
  else btn.style.transform = "translateY(0px)";
});

btnOprationContainer.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) return;

  btnContent.forEach((btn) => {
    btn.style.transform = "translateY(0px)";
    e.target.style.transform = "translateY(10px)";
  });

  oprationContents.forEach((content) => {
    content.style.opacity = "0";

    if (e.target.getAttribute("opration") === content.getAttribute("opration"))
      content.style.opacity = "1";
  });
});

// sliders section
const slideContent = document.querySelectorAll(".slide-content");

slideContent.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});

const contentBtnLeft = document.querySelector(".content-btn-1");
const contentBtnRight = document.querySelector(".content-btn-2");

let currentCount = 0;
let maxCouont = slideContent.length - 1;

contentBtnRight.addEventListener("click", function () {
  if (currentCount === maxCouont) currentCount = 0;
  else currentCount++;

  slideContent.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentCount)}%)`;
  });
});

contentBtnLeft.addEventListener("click", function () {
  if (currentCount === 0) currentCount = maxCouont;
  else currentCount--;

  slideContent.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentCount)}%)`;
  });
});

// lazy loading texts and images
const headings = document.querySelectorAll(".headings");

const headingCallback = function (entries, headingObserver) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    headings.forEach((head, i) => {
      if (entry.target === head) {
        head.classList.add("heading-anim");
        headingObserver.unobserve(head);
      }
    });
  }
};
const headingOption = {
  root: null,
  rootMargin: "-200px",
  threshold: 0.9,
};

const headingObserver = new IntersectionObserver(
  headingCallback,
  headingOption
);

headings.forEach((head, i) => {
  headingObserver.observe(head);
});
