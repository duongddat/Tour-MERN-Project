import { useLoaderData } from "react-router-dom";

export default function HomePage() {
  const data = useLoaderData();
  console.log(data.data.tours);
  return <h1>Home Page</h1>;
}
