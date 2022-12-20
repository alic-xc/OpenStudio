import routes from "./router";

export const pageLoader = (name) => {
  let content = new Promise(function (resolve, rejected) {
    const page = routes.filter((item) => item.path === name);
    const content = {
      execute: "",
      response: "",
      template: "",
    };
    const request = new XMLHttpRequest();
    let file = page[0].file;
    let template = page[0].template;
    let execute = page[0].execute;
    console.log(file);
    if (page[0].isAuth == "merchant") {
      const merchatId = window.localStorage.getItem("merchantId");
      if (!merchatId) {
        execute = () => {};
        file = "/pages/Permission.html";
        template = "/layout/AppLayout.html";
      }
    } else if (page[0].isAuth == "user") {
      const userId = window.localStorage.getItem("userId");
      if (!userId) {
        execute = () => {};
        file = "/pages/Permission.html";
        template = "/layout/AppLayout.html";
      }
    }
    console.log(file);

    request.open("GET", file);
    request.onload = function () {
      content.execute = execute;
      content.response = this.response;
      if (template) {
        const templateRequest = new XMLHttpRequest();
        templateRequest.open("GET", template);
        templateRequest.onload = function () {
          content.template = this.response;
          resolve(content);
        };
        templateRequest.send();
      }
    };
    request.onerror = function (err) {
      rejected(err);
    };
    request.send();
  });
  return content;
};
