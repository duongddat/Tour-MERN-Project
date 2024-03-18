import { useState } from "react";

import "./FilterTour.css";

function FilterTourOption({ onFilter }) {
  const [ratingFilter, setRatingFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  function handleReset() {
    setRatingFilter("");
    setDurationFilter("");
    onFilter("", "");
  }

  return (
    <div className="card card-filter mb-3">
      <div className="card-padding title-filter">
        <h5 className="md">Lọc kết quả</h5>
        <div className="text-center btn-text">
          <div className="sm" onClick={handleReset}>
            Đặt lại
          </div>
        </div>
      </div>
      <div className="card-padding card-filter-detail">
        <div className="md">Xếp hạng sao</div>
        <label
          id="lte3"
          className="checkbox_container"
          onClick={() => {
            setRatingFilter("lte3");
            onFilter("ratingsAverage", "ratingsAverage[lte]=3");
          }}
        >
          <input
            id="lt3"
            type="radio"
            name="rating"
            checked={ratingFilter === "lte3"}
            onChange={() => {}}
          />
          <div className="sm">{`<= 3 sao`}</div>
        </label>
        <label
          id="gte3&lte4"
          className="checkbox_container"
          onClick={() => {
            setRatingFilter("gte3&lte4");
            onFilter(
              "ratingsAverage",
              "ratingsAverage[gte]=3&ratingsAverage[lte]=4"
            );
          }}
        >
          <input
            id="gte3&lte4"
            type="radio"
            name="rating"
            checked={ratingFilter === "gte3&lte4"}
            onChange={() => {}}
          />
          <div className="sm">{`>= 3 sao và <= 4 sao`}</div>
        </label>
        <label
          id="gte4"
          className="checkbox_container"
          onClick={() => {
            setRatingFilter("gte4");
            onFilter("ratingsAverage", "ratingsAverage[gte]=4");
          }}
        >
          <input
            id="gte4"
            type="radio"
            name="rating"
            checked={ratingFilter === "gte4"}
            onChange={() => {}}
          />
          <div className="sm">{`>= 4 sao`}</div>
        </label>
      </div>
      <div className="card-padding card-filter-detail">
        <div className="md">Xếp hạng thời lượng</div>
        <label
          id="lte5"
          className="checkbox_container"
          onClick={() => {
            setDurationFilter("lte5");
            onFilter("duration", "duration[lte]=5");
          }}
        >
          <input
            id="lte5"
            type="radio"
            name="duration"
            checked={durationFilter === "lte5"}
            onChange={() => {}}
          />
          <div className="sm">{`<= 5 ngày`}</div>
        </label>
        <label
          id="gte5"
          className="checkbox_container"
          onClick={() => {
            setDurationFilter("gte5");
            onFilter("duration", "duration[gte]=5");
          }}
        >
          <input
            id="gte5"
            type="radio"
            name="duration"
            checked={durationFilter === "gte5"}
            onChange={() => {}}
          />
          <div className="sm">{`>= 5 ngày`}</div>
        </label>
      </div>
    </div>
  );
}

export default FilterTourOption;
