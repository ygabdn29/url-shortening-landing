"use strict";

const mobileMenu = document.querySelector(".header__menu");
const headerNav = document.querySelector(".header__nav");
const shortlyForm = document.querySelector(".shortly-form__input-form");
const shortlyUrlInput = document.querySelector(".shortly-form__url-input");
const errorLabel = document.querySelector(".shortly-form__label-input-error");
const shortenUrlSection = document.querySelector(".shorten-url");

let links = [];

mobileMenu.addEventListener("click", function () {
  headerNav.classList.toggle("header__nav--active");
});

function copyText(shortenURL) {
  let text = shortenURL.textContent.trim();

  navigator.clipboard.writeText(text);
  console.log("Content copied to clipboard");
}

function renderShortenLink(originalURL, shortenURL) {
  let shortenLinkHTML = `
  <div class="shorten-url__container">
    <p class="shorten-url__url-text">${originalURL}</p>

    <hr class="shorten-url__break" />

    <p class="shorten-url__url-text shorten-url__url-text--shorten">
      ${shortenURL}
    </p>

    <div class="shorten-url__btn-container">
      <button class="shorten-url__copy-url-btn">Copy</button>
    </div>
  </div>`;

  shortenUrlSection.classList.remove("shorten-url--hidden");
  shortenUrlSection.insertAdjacentHTML("beforeend", shortenLinkHTML);
}

function setLocalStorage(data) {
  localStorage.setItem("links", JSON.stringify(data));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("links"));

  if (!data) return;

  let shortenLinks = data;

  shortenLinks.forEach((links) =>
    renderShortenLink(links.originalUrl, links.shortenUrl)
  );
}

shortlyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const urlInput = Object.fromEntries(new FormData(e.target));
  if (!urlInput["url-input"]) {
    shortlyUrlInput.classList.add("shortly-form__url-input--error");
    errorLabel.classList.remove("shortly-form__label-input-error--hidden");
  }

  if (urlInput["url-input"]) {
    shortlyUrlInput.classList.remove("shortly-form__url-input--error");
    errorLabel.classList.add("shortly-form__label-input-error--hidden");
    let shortenLink = {
      originalUrl: urlInput["url-input"],
      shortenUrl: "https://cleanuri.com/x9lZzk",
    };
    links.push(shortenLink);

    setLocalStorage(links);
    renderShortenLink(shortenLink.originalUrl, shortenLink.shortenUrl);
  }
});

shortenUrlSection.addEventListener("click", function (e) {
  if (!e.target.classList.contains("shorten-url__copy-url-btn")) return;
  copyText(
    e.target
      .closest(".shorten-url__container")
      .querySelector(".shorten-url__url-text--shorten")
  );

  e.target.classList.add("shorten-url__copy-url-btn--copied");
  e.target.innerHTML = "Copied!";
});

getLocalStorage();
