/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderBlog(requestUrl) {
  const response = await fetch(`http://localhost:8080/posts/${requestUrl}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch blogs." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.posts;
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
  const match = url.match(/blog(.*)/);
  let requestUrl = "";

  if (match && match[1]) {
    const afterURL = match[1];
    console.log(afterURL);

    if (afterURL.startsWith("/country")) {
      requestUrl = afterURL;
    }
  }

  return defer({
    blogs: await loaderBlog(requestUrl),
    countries: loaderCountry(),
  });
}
