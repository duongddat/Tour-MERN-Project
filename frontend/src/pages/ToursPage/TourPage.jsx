import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import SearchBar from "../../shared/SearchBar";
import headingBorderImg from "../../assets/img/heading-border.webp";
import TourList from "../../components/Tours/TourList";
import "./TourPage.css";

export default function TourPage() {
  const { tours } = useRouteLoaderData("tours");
  const [tourData, setTourData] = useState([]);
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [sortTour, setSortTour] = useState({
    name: "",
    path: "",
  });

  useEffect(() => {
    async function getTour() {
      try {
        setTourData(await tours);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
    }

    getTour();
  }, [tours]);

  function handleFilter() {
    setIsShowDropDown((prevState) => !prevState);
  }

  function handleSortTourDecrease() {
    setSortTour({
      name: "decrease",
      path: "?-price",
    });
    handleFilter();
  }

  function handleSortTourIncrease() {
    setSortTour({
      name: "increase",
      path: "?price",
    });
    handleFilter();
  }

  function handleNoSort() {
    setSortTour({
      name: "",
      path: "",
    });
    handleFilter();
  }

  return (
    <div className="section-bg p-5 d-flex flex-column gap-80">
      <div className="d-flex flex-column gap-80">
        <div className="h-full"></div>
        <SearchBar />
      </div>
      <div className="container tour-container">
        <div className="search-detail-header d-flex justify-content-between row-gap-3 flex-wrap">
          <div className="search-detail-title">
            <h4>Tìm thấy {tourData.length} kết quả</h4>
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
          <div className="search-detail-filter dropdowm">
            <div className="md btn btn-filter btn-icon" onClick={handleFilter}>
              {sortTour.name === ""
                ? "Không sắp xếp"
                : sortTour.name === "increase"
                ? "Giá thấp đến cao"
                : "Giá cao đến thấp"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
              </svg>
            </div>
            {isShowDropDown && (
              <div className="dropdown-container search-detail-dropdown">
                <ul className="dropdown-list">
                  <li className="dropdown-item" onClick={handleNoSort}>
                    Không sắp xếp
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={handleSortTourIncrease}
                  >
                    Giá thấp đến cao
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={handleSortTourDecrease}
                  >
                    Giá cao đến thấp
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 col-12"></div>
              <div className="col-lg-9 col-md-6 col-sm-12 col-12">
                <TourList
                  tours={tourData}
                  classes="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
