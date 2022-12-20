import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        authTemplate: resolve(__dirname, "layout/AuthLayout.html"),
        appTemplate: resolve(__dirname, "layout/AppLayout.html"),
        BookStudio: resolve(__dirname, "pages/BookStudio.html"),
        CreateBookStudio: resolve(__dirname, "pages/CreateBookStudio.html"),
        Dashboard: resolve(__dirname, "pages/Dashboard.html"),
        Login: resolve(__dirname, "pages/Login.html"),
        MerchantCreateStudio: resolve(
          __dirname,
          "pages/MerchantCreateStudio.html"
        ),
        MerchantDashboard: resolve(__dirname, "pages/MerchantDashboard.html"),
        MerchantFetchStudio: resolve(
          __dirname,
          "pages/MerchantFetchStudio.html"
        ),
        MerchantRegistration: resolve(
          __dirname,
          "pages/MerchantRegistration.html"
        ),
        Permission: resolve(__dirname, "pages/Permission.html"),
        UserRegistration: resolve(__dirname, "pages/UserRegistration.html"),
      },
    },
  },
});
