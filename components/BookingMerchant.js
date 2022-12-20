import { clientsFilterSchema } from "./Schemas";
import { formExtractor } from "./FormExtractor";

export const BookingMerchant = (element) => {
  const filterForm = element.querySelector("#filter-form");
  let url = "limit=20&offset=1&type=MERCHANT";
  element.querySelector("#filter").onclick = function () {
    const newFilterForm = formExtractor(filterForm);
    clientsFilterSchema.validate(newFilterForm);

    if (newFilterForm["city"]) {
      url += "&city=" + newFilterForm["city"];
    }

    if (newFilterForm["name"]) {
      url += "&name=" + newFilterForm["name"];
    }

    ClientsRequest(url, element);
  };

  ClientsRequest(url, element);
};

const ClientsRequest = (urlParams = "", element) => {
  let baseUrl = import.meta.env.VITE_BASE_URL;
  let tbody = element.querySelector("tbody");
  fetch(`${baseUrl}/clients?${urlParams}`, {
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
            <td>${elem.name}</td>
            <td>${elem.email}</td>
            <td>${elem.cityOfOperation}</td>
            <td>${elem.phoneNumber}</td>
            <td> <a class="navigation text-[blue] underline" href="/booking/create?merchant=${elem.merchantId}">Book session here</a></td>
        </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch((err) => console.log(err));
};
