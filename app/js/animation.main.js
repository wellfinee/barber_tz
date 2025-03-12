
gsap.registerPlugin(ScrollTrigger);


const isMobile = window.innerWidth < 1180;
console.log("isMobile:", isMobile);


gsap.timeline({delay: 1}).set(
  [".animation-order-1", ".animation-order-2", ".animation-order-3", ".animation-order-4"],
  { opacity: 0, scale: 0.8, x: 0 }
);

const knifeTimeline = gsap.timeline({ delay: 3, onComplete: triggerClassAnimations });

knifeTimeline
  .to(".main__knife-wrap", {
    x: "48vw",
    y: "-2vw",
    opacity: 1,
    duration: 1.5,
    ease: "power2.out"
  }, 0)
  .to(".main-head__decor-01 img", {
    rotateZ: 200,
    opacity: 1,
    duration: 1.5,
    keyframes: [
      { opacity: 1, rotateZ: 210, y: "0%", x: "20%", duration: 0.7, ease: "power2.out" },
      { rotateZ: 225, y: "25%", x: "30%", duration: 0.6, ease: "power2.in" },
      { rotateZ: 230, y: "25%", x: "35%", duration: 0.2, ease: "power2.in" }
    ]
  }, 0)
  .to(".main-head__decor-02 img", {
    rotateZ: 140,
    duration: 1.5,
    keyframes: [
      { opacity: 1, rotateZ: 155, y: "-35%", x: "-9.5%", duration: 0.7, ease: "power2.out" },
      { rotateZ: 145, y: "-32%", x: "-11%", duration: 0.6, ease: "power2.in" },
      { rotateZ: 135, y: "-38%", x: "-8%", duration: 0.2, ease: "power2.in" }
    ]
  }, 0);


function triggerClassAnimations() {
  gsap.to(".animation-order-1", { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
  gsap.to(".animation-order-2", { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: "power2.out" });
  gsap.to(".animation-order-3", { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: "power2.out" });
  gsap.to(".animation-order-4", {
    opacity: 1,
    x: "10px",
    duration: 1.2,
    delay: 0.6,
    ease: "power2.out",
    onComplete: startClass5Loop
  });
}

function startClass5Loop() {
  gsap.timeline({ repeat: -1, yoyo: true })
    .to(".animation-order-5", { scale: 1.2, duration: 0.5, ease: "power2.inOut" })
    .to(".animation-order-5", { rotateZ: 13, duration: 0.8, ease: "power2.inOut" }, "-=0.2")
    .to(".animation-order-5", { rotateZ: 0, duration: 0.8, ease: "power2.inOut" })
    .to(".animation-order-5", { scale: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.2");
}


document.addEventListener("DOMContentLoaded", () => {

  gsap.fromTo(".advantages", { y: 100, opacity: 1 }, {
    y: -200,
    opacity: 1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".advantages__container",
      start: "top 90%",
      end: "top 20%",
      scrub: true,
      pin: false
    }
  });

  gsap.fromTo(".advantages__container h1", { opacity: 0, y: 50 }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".advantages__container h1",
      start: "top 95%",
      end: "top 50%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.fromTo(".advantages__item", { opacity: 0, x: 100 }, {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".advantages__container",
      start: "top 85%",
      end: "bottom 40%",
      scrub: true,
      toggleActions: "play none none reverse"
    }
  });
});


const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 1181px)",
  isMobile: "(max-width: 1180px)"
}, (context) => {
  const { isMobile } = context.conditions;

  gsap.set(".sticky__block", { opacity: 0 });
  gsap.set(".price1", { x: 0, opacity: 1 });
  gsap.set(".price2", { x: "100vw", opacity: 0 });
  gsap.set(".image1", { x: 0, y: 0, opacity: 1, rotateZ: 0 });
  gsap.set(".image2", {
    x: isMobile ? "-10vw" : "-100vw",
    y: isMobile ? "10vw" : "100vw",
    rotateZ: -20,
    opacity: 0
  });

  gsap.to(".sticky__block", {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".sticky",
      start: "top center",
      end: "top 40%",
      toggleActions: "play none none reverse"
    }
  });

  const priceAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".sticky",
      start: "600vh",
      end: "1200vh",
      toggleActions: "play none none reverse"
    }
  });

  priceAnimation
    .to(".price1", { x: "100vw", opacity: 0, duration: 0.5 })
    .to(".image1", {
      x: isMobile ? "-10vw" : "-100vw",
      y: isMobile ? "10vw" : "100vw",
      rotateZ: -20,
      opacity: 0,
      duration: 0.5
    }, "-=0.4")
    .to(".price2", { x: 0, opacity: 1, duration: 0.5 }, "-=0.4")
    .to(".image2", {
      x: isMobile ? "10vw" : "1vw",
      y: isMobile ? "-2vw" : "1vw",
      rotateZ: 0,
      opacity: 1,
      duration: 0.5
    }, "-=0.4")
    .set(".marquee__sticky_01", isMobile ? {} : { bottom: "4vw", left: 0, rotateZ: -2 })
    .set(".marquee__sticky_02", isMobile ? {} : { bottom: "70vh", left: "46vw", rotateZ: 90 });

  const reversePriceAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".sticky",
      start: "0vh",
      end: "600vh",
      toggleActions: "reverse none none play"
    }
  });

  reversePriceAnimation
    .to(".price2", { x: "100vw", opacity: 0, duration: 0.5 })
    .to(".image2", {
      x: isMobile ? "-10vw" : "-100vw",
      y: isMobile ? "10vw" : "100vw",
      rotateZ: -20,
      opacity: 0,
      duration: 0.5
    }, "-=0.4")
    .to(".price1", { x: 0, opacity: 1, duration: 0.5 }, "-=0.4")
    .to(".image1", {
      x: isMobile ? "-1vw" : "0vw",
      y: isMobile ? "1vw" : "0vw",
      rotateZ: isMobile ? 0 : 0,
      opacity: 1,
      duration: 0.5
    }, "-=0.4")
    .set(".marquee__sticky_01", isMobile ? {} : { bottom: "70vh", left: "46vw", rotateZ: 90 })
    .set(".marquee__sticky_02", isMobile ? {} : { bottom: "4vw", left: 0, rotateZ: -2 });
});


gsap.timeline({ repeat: -1, yoyo: true })
  .to(".price__img", { scale: 1.05, duration: 0.4 })
  .to(".price__img", { rotate: -15, duration: 0.8 });

  gsap.to(".image img", {
    rotateZ: "+=5",     
    duration: 0.45,     
    yoyo: true,
    repeat: -1,       
    ease: "power1.inOut"
  });