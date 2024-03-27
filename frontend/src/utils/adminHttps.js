import { json } from "react-router-dom";

//=============== Tour Admin ========================
//1. Create Tour
export async function createTourAdmin(data) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/tours`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const resData = await response.json();

  return resData;
}
