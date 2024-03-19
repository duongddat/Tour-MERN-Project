/* eslint-disable no-unused-vars */
import { defer, json } from "react-router-dom";

async function loaderBlog() {
  const response = await fetch("http://localhost:8080/posts");

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

export async function loader({ request, params }) {
  return defer({
    blogs: await loaderBlog(),
  });
}
