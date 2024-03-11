import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import TourDetail from "../../components/TourDetail/TourDetail";
import Booking from "../../components/Booking/Booking";

function DetailTourPage() {
  const { tour } = useLoaderData();

  return (
    <section>
      <div className="container">
        <div className="row row-gap-3">
          <div className="col-lg-8 col-md-12 col-12">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
            >
              <Await resolve={tour}>
                {(loadedTour) => <TourDetail tour={loadedTour} />}
              </Await>
            </Suspense>
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <Booking tour={tour} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailTourPage;
