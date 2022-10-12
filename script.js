"use strict";

// elements selection///////////////////////////////////////
const nav = document.querySelector(".nav");
const navOne = document.querySelector(".nav--one");
const navIntersect = document.querySelector(".nav--intersection");
const help = document.querySelector(".nav--two__help--btn");
const helpHover = document.querySelector(".help--hover__content");
const navHeight = navOne.getBoundingClientRect().height;
const computerAccessoriesBtn = document.querySelector(
  ".computers-and-accessories__btn"
);
const slides = document.querySelectorAll(".slider--img");
const dots = document.querySelector(".slide--dots");
const allDots = document.querySelectorAll(".slide--dot");
const mobileNavControl = document.querySelector(".mobile--nav__bars");
const openNav = document.querySelector(".mobile--nav__open");
const closeNav = document.querySelector(".mobile--nav__close");
const sidebar = document.querySelector(".nav--two__sidebar");
const sidebarClose = document.querySelector(".sidebar--close");
const searchBar = document.querySelector(".search--bar");
const browseAll = document.querySelector(".sidebar--open");
const mobileNavNavs = document.querySelector(".mobile--nav__navs");
const navHidden = document.querySelector(".nav--two__nav--hidden");
const allLinks = document.querySelectorAll("a").forEach((e) => {
  e.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

// functions///////////////////////////////////
// nav two help over implementation
const openHover = function () {
  help.addEventListener("mouseover", function () {
    help.children[1].classList.remove("hidden");
  });
  help.addEventListener("mouseleave", function () {
    help.children[1].classList.add("hidden");
  });
};
openHover();

// nav three nav hover implementation
let timer;
document
  .querySelector(".nav--three")
  .addEventListener("mouseover", function (e) {
    timer = setTimeout(function () {
      e.preventDefault();
      if (e.target.classList.contains("nav--three__btn")) {
        e.target.classList.add("active--hover");
        const id = e.target.getAttribute("id");
        document.querySelectorAll(".nav--three__btn").forEach((el) => {
          if (el.getAttribute("id") !== id)
            el.classList.remove("active--hover");
        });
        // console.log(id);

        const unhide = document.querySelector(`.${id}`);
        document.querySelectorAll(".nav--three__hover").forEach((el) => {
          if (!el.classList.contains(id)) el.classList.add("hidden");
        });
        unhide.classList.remove("hidden");
        document.querySelector(".overlay").classList.remove("hidden");
      }
    }, 90);
  });
document
  .querySelector(".nav--three")
  .addEventListener("mouseleave", function () {
    clearTimeout(timer);
    document.querySelectorAll(".nav--three__hover").forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("active--hover");
    });
    document.querySelector(".all--categories").classList.add("hidden");
    document.querySelectorAll(".nav--three__btn").forEach((el) => {
      el.classList.remove("active--hover");
    });
    document.querySelector(".overlay").classList.add("hidden");
  });

// all categories hover//////////////////////////////
document
  .querySelector(".all--categories__left")
  .addEventListener("mouseover", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("all--categories__left--links")) {
      e.target.classList.add("active");
      const id = e.target.getAttribute("id");
      document
        .querySelectorAll(".all--categories__left--links")
        .forEach((el) => {
          if (el.getAttribute("id") !== id) el.classList.remove("active");
        });
      const unhide = document.querySelector(`.${id}`);
      document.querySelectorAll(".all--categories__hover").forEach((el) => {
        if (!el.classList.contains(id)) el.classList.add("hidden");
      });
      unhide.classList.remove("hidden");
    }
  });

//using the observer API to implement sticky header
const stickyNav = function (entries) {
  const [entry] = entries; //or const entry = entries[0]
  console.log(entry);

  if (entry.isIntersecting) {
    navOne.classList.remove("hidden");
    navIntersect.classList.remove("sticky");
  } else {
    if (!navHidden.classList.contains("sidebar--active")) {
      navOne.classList.add("hidden");
      navIntersect.classList.add("sticky");
    }
  }
};
const stickyNavOptions = {
  root: null,
  threshold: 0.2,
  rootMargin: `${navHeight}px`, //margin to insert before header, must be in pixel
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(nav);

////close message/////////////////////
window.addEventListener("onload", function () {
  document.querySelector(".message").classList.toggle("hidden");
});
const closeMessage = function () {
  document.querySelector(".message").classList.toggle("hidden");
};
document
  .querySelector(".close--message")
  .addEventListener("click", closeMessage);

/////////////////////////////////////////
//////// implementation of slider/////////////
let slideIndex = 0;
let timeOut = null;

const plusSlides = function (n) {
  clearTimeout(timeOut);
  showSlides((slideIndex += n));
};

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("slide--dot")) {
    slideIndex = e.target.getAttribute("data") - 1;
    allDots.forEach((el) => {
      el.classList.remove("active--slide");
    });
    clearTimeout(timeOut);
    e.target.classList.add("active--slide");
    slides.forEach((el) => {
      el.classList.add("hidden--img");
      if (e.target.getAttribute("data") == el.getAttribute("data"))
        el.classList.remove("hidden--img");
    });
    setTimeout(showSlides, 4000);
  }
});

function showSlides(n) {
  if (n == undefined) {
    n = ++slideIndex;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  slides.forEach((el) => {
    el.classList.add("hidden--img");
  });
  allDots.forEach((el) => {
    el.classList.remove("active--slide");
  });
  if (slideIndex == slides.length) slideIndex = 0;
  slides[slideIndex].classList.remove("hidden--img");
  allDots[slideIndex].classList.add("active--slide");
  timeOut = setTimeout(showSlides, 4000);
}

showSlides(slideIndex);
document.querySelector(".next").addEventListener("click", function () {
  plusSlides(1);
});
document.querySelector(".prev").addEventListener("click", function () {
  plusSlides(-1);
});

////mobile nav controls/////////////////////////////////////
closeNav.classList.add("hidden");

//////hide search bar
const searchBarHide = function () {
  if (searchBar.classList.contains("hidden"))
    searchBar.classList.remove("hidden");
  else {
    searchBar.classList.add("hidden");
  }
};

// hidden side navigation//////////////////////
const openHiddenNav = function () {
  searchBarHide();
  if (sidebar.classList.contains("sidebar--active")) {
    // navHidden.classList.remove("sidebar--active");
    sidebar.classList.remove("sidebar--active");
  }
  if (openNav.classList.contains("hidden"))
    navHidden.classList.remove("sidebar--active");
  else navHidden.classList.add("sidebar--active");
};

// sidebar for browse all////////////////////////
const toggleSidebar = function () {
  navOpenClose();
  sidebar.classList.toggle("sidebar--active");
  // mobileNavNavs.classList.add("hidden--nav");
};

const navOpenClose = function () {
  openNav.classList.toggle("hidden");
  closeNav.classList.toggle("hidden");
};

// close side bar//////////////////////////
const closeSidebar = function () {
  sidebar.classList.remove("sidebar--active");
  navOpenClose();
  searchBarHide();
};

////////event listeners///////////////////////
mobileNavControl.addEventListener("click", function (e) {
  openHiddenNav();
  navOpenClose();
  // navIntersect.classList.remove("sticky");
});

browseAll.addEventListener("click", function () {
  toggleSidebar();
  searchBarHide();
});
sidebarClose.addEventListener("click", closeSidebar);
