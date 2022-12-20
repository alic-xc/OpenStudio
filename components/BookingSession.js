import { navigationLoader } from "./NavigationLoader";
import { BookingSessionSchema } from "./Schemas";
import { formExtractor } from "./FormExtractor";

export const BookingSession = (element) => {
  let baseUrl = import.meta.env.VITE_BASE_URL;
  const form = element.querySelector("#session-form");

  form.querySelector("#submit").onclick = function (e) {
    bookingHandler(form);
  };

  sessionHandler(element);
  const bookingHandler = function (form) {
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

const sessionHandler = function (element) {
  let baseUrl = import.meta.env.VITE_BASE_URL;
  const urlQuery = window.location.search;
  const urlParams = new URLSearchParams(urlQuery);
  const sessionInput = element.querySelector("#sessionId");
  const merchantID = urlParams.get("merchant");

  if (merchantID) {
    fetch(`${baseUrl}/studios/${merchantID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const results = response.json();
        return results;
      })
      .then(function (results) {
        sessionInput.innerHTML = "";
        sessionInput.innerHTML += "<option value=''>Please select</option>";
        results.forEach((elem) => {
          sessionInput.innerHTML += `<option value="${elem.id}"> (${elem.type}) Start From : ${elem.startsAt}  To ${elem.endsAt} </option>`;
        });
      })
      .catch((err) => console.log(err));
  } else {
    navigationLoader("/booking/merchant");
  }
};
