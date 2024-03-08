import { Await, useLoaderData } from "react-router-dom";

import "./DetailTourPage.css";
import { Suspense } from "react";
import TourDetail from "../../components/TourDetail/TourDetail";

function DetailTourPage() {
  const { tour } = useLoaderData();

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
            >
              <Await resolve={tour}>
                {(loadedTour) => <TourDetail tour={loadedTour} />}
              </Await>
            </Suspense>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </section>
  );
}

export default DetailTourPage;
