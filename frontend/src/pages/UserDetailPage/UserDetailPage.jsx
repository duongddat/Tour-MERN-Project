import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

function UserDetailPage() {
  const { user } = useLoaderData();
  return (
    // <Suspense fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}>
    //   <Await resolve={user}>{(loadedUser) => <>{loadedUser.name}</>}</Await>
    // </Suspense>
    <>hahaah</>
  );
}

export default UserDetailPage;
