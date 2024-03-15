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
