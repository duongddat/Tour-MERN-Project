//=====================Fetching User Login =================================
export async function fetchingLogin(data) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resDate = await response.json();

  return resDate;
}
