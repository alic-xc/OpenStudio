import { formExtractor } from "./FormExtractor";
import { SessionScheme } from "./Schemas";
import { navigationLoader } from "./NavigationLoader";

import moment from "moment";

export const MerchantSession = (element) => {
  const sessionForm = element.querySelector("#session-form");
  let baseUrl = import.meta.env.VITE_BASE_URL;
  const merchantID = window.localStorage.getItem("merchantId");

  element.querySelector("#submit").onclick = function () {
    const newSessionForm = formExtractor(sessionForm);
    const isSessionVerified = SessionValidation(
      newSessionForm.startTime,
      newSessionForm.endTime,
      newSessionForm.type
    );
    if (isSessionVerified) {
      const validation = SessionScheme.validate(newSessionForm);

      validation
        .then(() => {
          newSessionForm["metadata"] = {};
          fetch(`${baseUrl}/studios/${merchantID}`, {
            method: "POST",
            body: JSON.stringify(newSessionForm),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              alert("Session Created successfully.");
              navigationLoader("/merchant/sessions");
            })
            .catch((err) => console.log(err));
        })
        .catch((content) => {
          console.log(content);
          alert(content.message);
          // alert(content.path);
        });
    }
  };
};

const SessionValidation = (startTime, endTime, weekDay) => {
  const startNow = moment("2013-01-02", "YYYY-MM-DD");
  const endNow = moment("2013-01-02", "YYYY-MM-DD");

  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  startNow.set("hour", startHour);
  startNow.set("minute", startMinute);

  endNow.set("hour", endHour);
  endNow.set("minute", endMinute);

  const timeDiff = parseInt(moment.duration(startNow.diff(endNow)).asMinutes());
  if (timeDiff === -45 || timeDiff === -60 || timeDiff === -90) {
  } else {
    alert(
      "Not a valid duration. 45, 60  and 90 minutes are the accepted  duration for  a session"
    );
    return false;
  }

  if (weekDay == "WeekDay" && (startNow.hours() < 9 || startNow.hours >= 20)) {
    alert("Session is only allowed from 9am to 8pm on weekdays");
    return false;
  }

  if (weekDay == "WeekEnd" && (startNow.hours() < 10 || startNow.hours >= 22)) {
    alert("Session is only allowed from 10am to 10pm on weekends");
    return false;
  }

  return true;
};

export const MerchantSessionRequest = (element) => {
  const merchantID = window.localStorage.getItem("merchantId");
  let baseUrl = import.meta.env.VITE_BASE_URL;
  let tbody = element.querySelector("tbody");
  fetch(`${baseUrl}/studios/${merchantID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      const results = result.data;
      tbody.innerHTML = "";
      results.forEach((elem) => {
        const row = `
        <tr>
            <td>${elem.bookingRef}</td>
            <td>${elem.startsAt}</td>
            <td>${elem.endsAt}</td>
            <td>${elem.type}</td>
        </tr>
        `;
        tbody.innerHTML = row;
      });
    })
    .catch((err) => console.log(err));
};
