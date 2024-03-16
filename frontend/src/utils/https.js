//=====================Forgot Password =================================
import { json } from "react-router-dom";

//1. Forgot Password
export async function forgotPassword(data) {
  const response = await fetch("http://localhost:8080/auth/forgotPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (resData.status === "success") {
    localStorage.setItem("emailResetOTP", data.email);
  }

  return resData;
}

//2. Verify OTP
export async function verifyOTP(data) {
  const response = await fetch("http://localhost:8080/auth/verifyOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  const resetToken = resData.data.resetToken;

  if (resetToken) {
    localStorage.setItem("resetToken", resetToken);
  }

  return resData;
}

//3. Reset Password
export async function resetPassword(data) {
  const resetToken = localStorage.getItem("resetToken");
  if (!resetToken) {
    throw json(
      { message: "Can not get reset token." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    "http://localhost:8080/auth/resetPassword/" + resetToken,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const resData = await response.json();

  if (resData.status === "success") {
    localStorage.setItem("token", resData.token);
    localStorage.removeItem("emailResetOTP");
    localStorage.removeItem("resetToken");
  }

  return resData;
}

//===============Tour Detail Review======================
//1. Create Review
export async function createReview(data) {
  const { review, rating, tourId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/tours/${tourId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    }
  );

  const resData = await response.json();

  return resData;
}
//2. Edit Review
export async function editReview(data) {
  const { review, rating, tourId, reviewId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/tours/${tourId}/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    }
  );

  const resData = await response.json();

  return resData;
}

//3.Delete Review
export async function deleteReview(data) {
  const { tourId, reviewId } = data;
  const token = localStorage.getItem("token");

  if (!token) {
    throw json(
      { message: "Please login to delete review." },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `http://localhost:8080/tours/${tourId}/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}
