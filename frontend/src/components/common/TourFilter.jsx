import { Suspense } from "react";
import { Await } from "react-router-dom";

import FilterTour from "../FilterTour/FilterTourCountry";
import FilterTourOption from "../FilterTour/FilterTourOption";

function TourFilter({ countries, onFilter }) {
  return (
    <div className="d-flex flex-column row-gap-3 sticky">
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Countries...</p>}
      >
        <Await resolve={countries}>
          {(loadedCountries) => <FilterTour countries={loadedCountries} />}
        </Await>
      </Suspense>
      <FilterTourOption onFilter={onFilter} />
    </div>
  );
}

export default TourFilter;
