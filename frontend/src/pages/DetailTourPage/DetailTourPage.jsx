import { Await, useLoaderData } from "react-router-dom";

import "./DetailTourPage.css";
import { Suspense } from "react";

function DetailTourPage() {
  const { tour } = useLoaderData();

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
            >
              <Await resolve={tour}>
                {(loadedTour) => <div>{loadedTour.title}</div>}
              </Await>
            </Suspense>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </section>
  );
}

export default DetailTourPage;
