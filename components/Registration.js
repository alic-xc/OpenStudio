import { navigationLoader } from "./NavigationLoader";
import {
  LoginSchema,
  MerchantRegistrationSchema,
  RegistrationSchema,
} from "./Schemas";
import { formExtractor } from "./FormExtractor";

export const RegistrationInit = (reg_type, element) => {
  var form = "";
  var validationSchema = "";

  let baseUrl = import.meta.env.VITE_BASE_URL;
  if (reg_type === "user") {
    form = element.querySelector("#user-registration-form");
    validationSchema = RegistrationSchema;
  } else if (reg_type === "login") {
    form = element.querySelector("#login-form");
    validationSchema = LoginSchema;
  } else {
    form = element.querySelector("#merchant-registration-form");
    validationSchema = MerchantRegistrationSchema;
  }

  form.querySelector("#submit").onclick = function (e) {
    if (reg_type == "login") {
      return loginHandler(validationSchema, form, "USER");
    } else {
      return submitHandler(validationSchema, form);
    }
  };

  const submitHandler = function (validationSchema, form) {
    const newForm = formExtractor(form);
    const validation = validationSchema.validate(newForm);
    validation
      .then(() => {
        newForm["metadata"] = {};
        fetch(`${baseUrl}/register/users`, {
          method: "POST",
          body: JSON.stringify(newForm),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            alert("Account Created successfully.");
            navigationLoader("/login");
          })
          .catch((err) => console.log(err));
      })
      .catch((content) => {
        alert(content.message);
        // alert(content.path);
      });
  };

  const loginHandler = function (validationSchema, form, userType) {
    const newForm = formExtractor(form);
    const validation = validationSchema.validate(newForm);
    newForm["accessType"] = userType;
    validation
      .then(() => {
        fetch(`${baseUrl}/sign-in`, {
          method: "POST",
          body: JSON.stringify(newForm),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              const request = response.json();
              return request;
            } else {
              alert("Check your username and password");
              throw new Error("N");
            }
          })
          .then((data) => {
            if (data?.token) {
              const locatstorage = window.localStorage;
              locatstorage.clear();
              locatstorage.setItem("token", data?.token);
              locatstorage.setItem("userType", userType);
              if (userType === "MERCHANT") {
                locatstorage.setItem("merchantId", data?.merchantId);
                navigationLoader("/merchant/dashboard");
              } else {
                locatstorage.setItem("userId", data?.userId);
                navigationLoader("/");
              }
            } else {
              alert("Check your username and password");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((content) => {
        alert(content.message);
      });
  };
  form.querySelector("#submit-merchant").onclick = function () {
    return loginHandler(validationSchema, form, "MERCHANT");
  };
};

/**
 *
 *
 */
