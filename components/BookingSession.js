import { navigationLoader } from "./NavigationLoader";
import { BookingSessionSchema } from "./Schemas";
import { formExtractor } from "./FormExtractor";

export const BookingSession = (element) => {
  let baseUrl = import.meta.env.VITE_BASE_URL;
  const form = element.querySelector("#session-form");
  console.log(form);
  form.querySelector("#submit").onclick = function (e) {
    loginHandler(form);
  };

  const loginHandler = function (form) {
    const newForm = formExtractor(form);
    const validation = BookingSessionSchema.validate(newForm);
    const userId = localStorage.getItem("userId");
    validation
      .then(() => {
        newForm["userId"] = userId;

        console.log(newForm);
        fetch(`${baseUrl}/bookings`, {
          method: "POST",
          body: JSON.stringify(newForm),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            const result = response.json();

            console.log(result);
            console.log(response);
            alert(
              `Booking Created successfully. Your booking  ref is ${result}`
            );
            navigationLoader("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((content) => {
        alert(content.message);
        // alert(content.path);
      });
  };
};
