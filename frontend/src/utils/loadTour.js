import { json } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:8080/tours");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch tours." },
      {
        status: 500,
      }
    );
  }

  return response;
}

// export function loader() {
//   return defer({
//     events: loadEvents(),
//   });
// }
