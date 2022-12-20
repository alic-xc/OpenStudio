import { formExtractor } from "./FormExtractor";
import { FilterSchema } from "./Schemas";

export const MerchantDashboard = (element) => {
  const filterForm = element.querySelector("#filter-form");
  let url = "?limit=50&offset=1";

  element.querySelector("#filter").onclick = function () {
    const newFilterForm = formExtractor(filterForm);
    console.log(newFilterForm);
    FilterSchema.validate(newFilterForm);
    if (newFilterForm["city"]) {
      url += "&city=" + newFilterForm["city"];
    }
    if (newFilterForm["fromDate"] || newFilterForm["toDate"]) {
      url +=
        "&period=" + newFilterForm["fromDate"] + ":" + newFilterForm["toDate"];
    }

    BookingRequest(url, element);
  };
  BookingRequest(url, element);
};

const BookingRequest = (urlParams = "", element) => {
  let baseUrl = import.meta.env.VITE_BASE_URL;
  let tbody = element.querySelector("tbody");
  fetch(`${baseUrl}/bookings${urlParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      const results = result.data;
      tbody.innerHTML = "";
      if (results) {
        results.forEach((elem) => {
          const row = `
          <tr>
              <td>${elem.bookingRef}</td>
              <td>${elem.title}</td>
              <td>${elem.notes}</td>
              <td>${elem.startsAt}</td>
              <td>${elem.endsAt}</td>
              <td>${elem.date}</td>
          </tr>
          `;
          tbody.innerHTML = row;
        });
      } else {
        tbody.innerHTML = "<tr colspan='6' ><td>No record found.</td></tr>";
      }
    })
    .catch((err) => console.log(err));
};
