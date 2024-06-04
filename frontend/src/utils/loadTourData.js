/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderTour(requestUrl) {
  const response = await fetch("http://localhost:8080/tours" + requestUrl);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch tours." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.tours;
  }
}

async function loaderCountry() {
  const response = await fetch("http://localhost:8080/countries");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch countries." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.countries;
  }
}

export async function loader({ request, params }) {
  const url = request.url;
  const match = url.match(/tours(.*)/);
  let requestUrl = "";

  if (match && match[1]) {
    const afterTours = match[1];

    if (
      afterTours.startsWith("/country") ||
      afterTours.startsWith("/search") ||
      afterTours.startsWith("?")
    ) {
      requestUrl = afterTours;
    }
  }

  return defer({
    tours: await loaderTour(requestUrl),
    countries: loaderCountry(),
  });
}
