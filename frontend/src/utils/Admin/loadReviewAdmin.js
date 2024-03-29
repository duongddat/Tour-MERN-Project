import { defer, json } from "react-router-dom";

async function loaderReview() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }
  const response = await fetch("http://localhost:8080/reviews", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch reviews." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.reviews;
  }
}

export async function loader() {
  return defer({
    reviews: await loaderReview(),
  });
}
