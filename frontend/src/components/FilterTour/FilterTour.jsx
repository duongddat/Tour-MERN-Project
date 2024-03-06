import { Link } from "react-router-dom";
import "./FilterTour.css";

function FilterTour({ countries }) {
  return (
    <div className="d-flex flex-column row-gap-3">
      <div className="card card-filter">
        <div className="card-padding title-filter">
          <h5 className="md">Quốc gia</h5>
        </div>
        <div className="card-padding card-filter-detail">
          <div className="card-filter-item md">
            <Link to="/tours">Tất cả</Link>
          </div>
          {countries.length > 0 &&
            countries.map((country) => (
              <div key={country._id} className="card-filter-item md">
                <Link to={`/tours/country/${country.slug}`}>
                  {country.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="card card-filter"></div>
    </div>
  );
}

export default FilterTour;
