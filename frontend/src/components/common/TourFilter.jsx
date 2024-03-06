import { Suspense } from "react";
import { Await } from "react-router-dom";

import FilterTour from "../../components/FilterTour/FilterTour";

function TourFilter({ countries }) {
  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading Countries...</p>}
    >
      <Await resolve={countries}>
        {(loadedCountries) => <FilterTour countries={loadedCountries} />}
      </Await>
    </Suspense>
  );
}

export default TourFilter;
