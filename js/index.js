"use strict";

const mobileMenu = document.querySelector(".header__menu");
const headerNav = document.querySelector(".header__nav");

mobileMenu.addEventListener("click", function () {
  headerNav.classList.toggle("header__nav--active");
});
