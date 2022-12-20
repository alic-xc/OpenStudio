import { RegistrationInit } from "./Registration";
import { MerchantDashboard } from "./MerchantDashboard";
import { MerchantSession, MerchantSessionRequest } from "./MerchantSession";
import { BookingSession } from "./BookingSession";

const routes = [
  {
    path: "/register",
    file: "/pages/UserRegistration.html",
    execute: (element) => RegistrationInit("user", element),
    template: "/layout/AuthLayout.html",
    isAuth: "all",
    key: "",
  },
  {
    path: "/register/user",
    file: "/pages/UserRegistration.html",
    execute: (element) => RegistrationInit("user", element),
    template: "/layout/AuthLayout.html",
    isAuth: "all",
    key: "",
  },
  {
    path: "/register/merchant",
    file: "/pages/MerchantRegistration.html",
    execute: (element) => RegistrationInit("merchant", element),
    template: "/layout/AuthLayout.html",
    isAuth: "all",
    key: "",
  },
  {
    path: "/login",
    file: "/pages/Login.html",
    execute: (element) => RegistrationInit("login", element),
    template: "/layout/AuthLayout.html",
    isAuth: "all",
    key: "",
  },

  {
    path: "/",
    file: "/pages/Dashboard.html",
    execute: () => {},
    template: "/layout/AppLayout.html",
    isAuth: "user",
    key: "",
  },
  {
    path: "/booking/create",
    file: "/pages/CreateBookStudio.html",
    execute: (element) => {
      BookingSession(element);
    },
    template: "/layout/AppLayout.html",
    isAuth: "user",
    key: "",
  },
  {
    path: "/bookings",
    file: "/pages/BookStudio.html",
    execute: (element) => {
      BookingSession(element);
    },
    template: "/layout/AppLayout.html",
    isAuth: "user",
    key: "",
  },
  {
    path: "/merchant/dashboard",
    file: "/pages/MerchantDashboard.html",
    execute: (element) => {
      MerchantDashboard(element);
    },
    template: "/layout/AppLayout.html",
    isAuth: "merchant",
    key: "",
  },
  {
    path: "/merchant/sessions",
    file: "/pages/MerchantFetchStudio.html",
    execute: (element) => {
      MerchantSessionRequest(element);
    },
    template: "/layout/AppLayout.html",
    isAuth: "merchant",
    key: "",
  },
  {
    path: "/merchant/session/create",
    file: "/pages/MerchantCreateStudio.html",
    execute: (element) => {
      MerchantSession(element);
    },
    template: "/layout/AppLayout.html",
    isAuth: "merchant",
    key: "",
  },
];

export default routes;
