import { pageLoader } from "./PageLoader";

export const navigationLoader = (path) => {
  const rootElement = document.querySelector("#app");
  pageLoader(path).then((res) => {
    rootElement.innerHTML = "";
    rootElement.innerHTML = res.template;
    rootElement.querySelector("#content").innerHTML = res.response;
    const userType = window.localStorage.getItem("userType");
    try {
      if (userType === "MERCHANT") {
        rootElement.querySelector("#merchant-nav").style.display = "block";
        rootElement.querySelector("#user-nav").style.display = "none";
      } else {
        rootElement.querySelector("#user-nav").style.display = "block";
        rootElement.querySelector("#merchant-nav").style.display = "none";
      }
    } catch (err) {
      console.log("Still loading.");
    }

    history.pushState({}, "Open Studio", path);
    res.execute(rootElement);
  });
};
