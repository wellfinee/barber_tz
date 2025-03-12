document.addEventListener("DOMContentLoaded", () => {
    // Элементы DOM
    const cursorSmall = document.querySelector(".cursor-small");
    const cursorBig = document.querySelector(".cursor-big");
    const menuButton = document.querySelector(".header__menu-button");
    const logo = document.querySelector(".header__logo");
    const preloader = document.getElementById("preloader");
    const bottomLine = document.querySelector(".header__button-string_bottom");
    const topLine = document.querySelector(".header__button-string_top");
    const header = document.querySelector(".header");
    const callButton = document.querySelector(".footer__call-link");
  
    // Конфигурация
    const isDesktop = window.innerWidth > 1180;
    const centerX = window.innerWidth / 2 - logo.clientWidth;
    const centerY = window.innerHeight / 2 - logo.clientHeight * 1.5;
  
    // Состояния
    let lastScrollY = window.scrollY;
    let ticking = false;
    let menuOpen = false;
  
    // Регистрируем GSAP плагины
    gsap.registerPlugin(ScrollTrigger);
    const menuRotationAnim = gsap.to(".rounded-animation", {
      rotation: 360,
      duration: 14,
      repeat: -1,
      ease: "linear"
    });
  
    // Инициализация анимации для ссылок с декором
    function initLinkAnimations() {
      document.querySelectorAll(".link_animation").forEach(link => {
        const svg = link.querySelector("svg:not(.logo)");
        if (!svg) return;
        const svgPath = svg.querySelector("path");
        if (!svgPath) return;
        const pathLength = Math.round(svgPath.getTotalLength());
        gsap.set(svgPath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
        link.addEventListener("mouseenter", () => {
          gsap.killTweensOf(svgPath);
          gsap.to(svgPath, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.killTweensOf(svgPath);
          gsap.to(svgPath, { strokeDashoffset: pathLength, duration: 0.8, ease: "power2.inOut" });
        });
      });
    }
  
    // Инициализация marquee для пунктов меню
    function initMenuMarquee() {
      document.querySelectorAll(".menu__items a:not(.menu__development)").forEach(link => {
        link.addEventListener("mouseenter", () => {
          const text = link.textContent;
          const marquee = document.createElement("div");
          marquee.classList.add("marquee");
          marquee.innerHTML = `<div class="marquee-inner">${(`<span>${text} &nbsp;</span><span>${text} &nbsp;</span>`).repeat(20)}</div>`;
          link.appendChild(marquee);
  
          const marqueeInner = marquee.querySelector(".marquee-inner");
          const parentWidth = link.offsetWidth;
          const speed = 100;
          const duration = parentWidth / speed;
          const anim = gsap.to(marqueeInner, {
            x: `-${parentWidth}px`,
            duration: duration,
            ease: "linear",
            repeat: -1
          });
  
          link.addEventListener("mouseleave", () => {
            anim.kill();
            marquee.remove();
          }, { once: true });
        });
      });
    }
  
    // Инициализация marquee для уже существующих элементов
    function initMarqueeAnimation() {
      document.querySelectorAll(".marquee").forEach(marquee => {
        const marqueeInner = marquee.querySelector(".marquee-inner");
        const parentWidth = window.screen.width;
        const speed = 100;
        const duration = parentWidth / speed;
        gsap.to(marqueeInner, {
          x: `-${parentWidth}px`,
          duration: duration,
          ease: "linear",
          repeat: -1
        });
      });
    }
  
    // Обработка скролла для скрытия/показа шапки
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        gsap.to(header, { top: "-200px", backgroundColor: "black", duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(header, { top: "0", duration: 0.3, ease: "power3.out" });
        if (currentScrollY === 0) {
          gsap.to(header, { backgroundColor: "transparent", duration: 0.3 });
        } else {
          gsap.to(header, { backgroundColor: "black", duration: 0.3 });
        }
      }
      lastScrollY = currentScrollY;
      ticking = false;
    }
  
    function initScrollHandler() {
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(handleScroll);
          ticking = true;
        }
      });
    }
  
    // Цветовая схема для анимаций меню
    const colors = {
      link: isDesktop ? "#2D2D2D" : "white",
      button: isDesktop ? "#E6FB04" : "white",
      circle: isDesktop ? "#2D2D2D" : "#E6FB04",
      lines: isDesktop ? "#2D2D2D" : "#E6FB04",
    };
  
    // Переключение состояния меню (открытие/закрытие)
    function toggleMenu() {
      if (!menuOpen) {
        gsap.to(header, { duration: 0.1, backgroundColor: "white" });
        gsap.to(".menu__bg", { duration: 1.5, top: "-80vh", skewY: "0deg", ease: "power3.out" });
        gsap.to(".menu__items", { duration: 1.5, top: isDesktop ? "15vh" : "15vh", opacity: 1, ease: "power3.out", delay: 0.2 });
        gsap.to(".header__link", { duration: 0.5, color: colors.link });
        gsap.to(".header__button", { duration: 0.5, backgroundColor: colors.button });
        gsap.to(".header__phone", { color: "#2D2D2D" });
        gsap.to(".header__phone > .header__decor > path", { stroke: colors.circle });
        gsap.to(".header__logo > svg > *", { fill: "#2D2D2D" });
        gsap.to(".header__link > .logo > *", { fill: colors.link });
        gsap.to(".header__link > .header__decor > path", { stroke: colors.lines });
        gsap.to("#circle_rounded > *", { fill: colors.circle });
        gsap.to("body", { overflowY: "hidden" });
        if (!isDesktop) {
          gsap.to(header, { backgroundColor: "white", duration: 0.5 });
          gsap.to(".header__menu", { zIndex: 10000, duration: 0 });
        }
      } else {
        gsap.to(header, { duration: 0.1, backgroundColor: window.scrollY < 100 ? "transparent" : "black" });
        gsap.to(".menu__items", { duration: 1.5, top: "-100vh", opacity: 0, ease: "power3.in" });
        gsap.to(".menu__bg", { duration: 1.5, top: "-500vh", skewY: "-3deg", ease: "power3.in", delay: 0.2 });
        gsap.to(".header__link", { duration: 0.5, color: "white" });
        gsap.to(".header__button", { duration: 0.5, backgroundColor: "white" });
        gsap.to(".header__phone > .header__decor > path", { stroke: colors.circle });
        gsap.to(".header__logo > svg > *, .header__link > .logo > *", { fill: "white" });
        gsap.to(".header__phone", { color: "#E6FB04" });
        gsap.to(".header__phone > .header__decor > path", { stroke: "white" });
        gsap.to(".header__decor > path", { stroke: "white" });
        gsap.to(".header__logo > svg > *", { fill: "white" });
        gsap.to(".header__link > .header__decor > path", { stroke: "#E6FB04" });
        gsap.to("#circle_rounded > *", { fill: "#E6FB04" });
        gsap.to("body", { overflowY: "scroll" });
        if (!isDesktop) {
          gsap.to(header, { backgroundColor: "transparent", duration: 0.5 });
          gsap.to(".header__menu", { zIndex: "auto", duration: 0 });
        }
      }
      // Анимация линий кнопки меню
      gsap.timeline()
        .to(topLine, {
          rotation: menuOpen ? 0 : 45,
          y: menuOpen ? 0 : 3.5,
          width: menuOpen ? "40%" : 0,
          duration: 0.5,
          ease: "power3.out"
        })
        .to(topLine, { width: "40%", duration: 0.5, ease: "power3.out" });
      gsap.timeline()
        .to(bottomLine, {
          rotation: menuOpen ? 0 : -45,
          y: menuOpen ? 0 : -3.5,
          width: menuOpen ? "40%" : 0,
          duration: 0.5,
          ease: "power3.out"
        })
        .to(bottomLine, { width: "40%", duration: 0.5, ease: "power3.out" });
      menuOpen = !menuOpen;
    }
  
    function initMenuToggle() {
      menuButton.addEventListener("click", toggleMenu);
    }
  
    // Обновление позиции курсоров
    function initCursor() {
      document.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
        gsap.to(cursorSmall, { x, y, duration: 0.1 });
        gsap.to(cursorBig, { x, y, duration: 1.2, ease: "power2.out" });
      });
    }
  
    // Эффекты наведения для кнопок (приостановка/возобновление анимации)
    function initButtonHoverEffects() {
      const mouseEnterButton = () => {
        menuRotationAnim.pause();
        const sizeProps = window.innerWidth > 960 
          ? { width: "45px", height: "45px", top: "calc(50% - 22.5px)", left: "calc(50% - 22.5px)" }
          : { width: "35px", height: "35px", top: "calc(50% - 17.5px)", left: "calc(50% - 17.5px)" };
        gsap.to(".header__button", { ...sizeProps, duration: 0.2, ease: "power3.out" });
      };
  
      const mouseLeaveButton = () => {
        menuRotationAnim.play();
        const sizeProps = window.innerWidth > 960 
          ? { width: "50px", height: "50px", top: "calc(50% - 25px)", left: "calc(50% - 25px)" }
          : { width: "40px", height: "40px", top: "calc(50% - 20px)", left: "calc(50% - 20px)" };
        gsap.to(".header__button", { ...sizeProps, duration: 0.2, ease: "power3.out" });
      };
  
      callButton.addEventListener("mouseenter", mouseEnterButton);
      callButton.addEventListener("mouseleave", mouseLeaveButton);
      menuButton.addEventListener("mouseenter", mouseEnterButton);
      menuButton.addEventListener("mouseleave", mouseLeaveButton);
    }
  
    // Прелоадер и анимация логотипа
    function initPreloaderAnimation() {
      gsap.set([logo, preloader], { position: "fixed", zIndex: 1000000 });
      gsap.set(logo, { opacity: 0, scale: 2, x: centerX, y: centerY });
      gsap.set(preloader, { width: "100vw", height: "100vh", backgroundColor: "black", x: 0, y: 0 });
      gsap.timeline()
        .to(logo, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
        .to(logo, { x: 0, y: 0, duration: 1.5, ease: "power2.out" })
        .set(logo, { x: 0, y: 0, position: "relative" })
        .to(preloader, { autoAlpha: 0, duration: 1 })
        .set(preloader, { display: "none" })
        .set(document.body, { overflow: "scroll" });
    }
  
    // Вызов инициализаций
    initLinkAnimations();
    initMenuMarquee();
    initMarqueeAnimation();
    initScrollHandler();
    initMenuToggle();
    initCursor();
    initButtonHoverEffects();
    initPreloaderAnimation();
  });
  