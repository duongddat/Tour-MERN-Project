export async function sortTourHTTP(filterUrl) {
  console.log(filterUrl);
  const response = await fetch(`http://localhost:8080${filterUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Fail to update user data");
  }

  const resDate = await response.json();

  return resDate.data.tours;
}
