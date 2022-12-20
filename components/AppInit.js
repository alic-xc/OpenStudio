import { navigationLoader } from "./NavigationLoader";

export const appInit = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const { pathname } = window.location;
    navigationLoader(pathname);
  });

  document.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("navigation")) {
      const pathname = e.target.getAttribute("href");
      navigationLoader(pathname);
    }
    if (e.target.classList.contains("logout")) {
      window.localStorage.clear();
      navigationLoader("/login");
    }
  });
};
