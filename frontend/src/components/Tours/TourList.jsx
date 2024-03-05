import TourItem from "./TourItem.jsx";
// import tours from "../../assets/data/tour";

function TourList({ tours, classes }) {
  return (
    <div className="row row-gap-5">
      {tours.map((tour) => (
        <div key={tour.id} className={classes}>
          <TourItem tour={tour} />
        </div>
      ))}
    </div>
  );
}

export default TourList;
