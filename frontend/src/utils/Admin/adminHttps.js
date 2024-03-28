import { json } from "react-router-dom";

//=============== Tour Admin ========================
//1. Create Tour
export async function createTourAdmin(data) {
  const { formData } = data;
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
    body: formData,
  });

  const resData = await response.json();

  return resData;
}

//2.Edit Tour
export async function editTourAdmin(data) {
  const { formData, idTour } = data;

  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/tours/${idTour}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//3. Delete Tour
export async function deleteTourAdmin(idTour) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/tours/${idTour}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
//=========================Country Admin========================
//1.Create Country
export async function createCountryAdmin(data) {
  const { formData } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/countries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}

//2.Edit Country
export async function editCountryAdmin(data) {
  const { formData, idCountry } = data;

  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/countries/${idCountry}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();

  return resData;
}
//3. Delete Country
export async function deleteCountryAdmin(idCountry) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to use this route." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(`http://localhost:8080/countries/${idCountry}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
