import { defer, json } from "react-router-dom";

async function loaderCountries() {
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

export async function loader() {
  return defer({
    countries: await loaderCountries(),
  });
}
