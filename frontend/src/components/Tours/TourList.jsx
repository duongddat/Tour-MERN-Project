import TourItem from "./TourItem.jsx";
import tours from "../../assets/data/tour";

function TourList() {
  return (
    <div className="row row-gap-5">
      {tours.map((tour) => (
        <div key={tour.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <TourItem tour={tour} />
        </div>
      ))}
    </div>
  );
}

export default TourList;
