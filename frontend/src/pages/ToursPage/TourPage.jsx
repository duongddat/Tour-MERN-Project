import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";

import headingBorderImg from "../../assets/img/heading-border.webp";
import SearchBar from "../../shared/SearchBar";
import TourDropDown from "../../components/common/TourDropDown";
import TourList from "../../components/Tours/TourList";
import "./TourPage.css";
import TourFilter from "../../components/common/TourFilter";
import { sortTourHTTP } from "../../https";

const defaultSort = {
  name: "",
  path: "",
};
export default function TourPage() {
  const location = useLocation();
  const [tourData, setTourData] = useState([]);
  const { tours, countries } = useLoaderData();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [sortTour, setSortTour] = useState(defaultSort);

  //================= Load Data ==================================
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

  //=======================Sort Data==============================
  function handleToggleFilter() {
    setIsShowDropDown((prevState) => !prevState);
  }

  function handleSortTour(name, path) {
    setSortTour({
      name,
      path,
    });
    handleToggleFilter();
    handleSort(path);
  }

  function handleSortTourDecrease() {
    handleSortTour("decrease", "sort=-price");
  }

  function handleSortTourIncrease() {
    handleSortTour("increase", "sort=price");
  }

  function handleNoSort() {
    handleSortTour("", "");
  }

  //Call API
  const handleSort = useCallback(
    async function handleSort(path) {
      const currentURL = location.pathname + location.search;
      const queryFilter = path;

      if (queryFilter || queryFilter === "") {
        const hasQuery = currentURL.includes("?");
        const separator = hasQuery ? "&" : "?";
        const filterUrl =
          queryFilter !== ""
            ? currentURL + separator + queryFilter
            : currentURL;

        console.log(filterUrl);
        const tours = await sortTourHTTP(filterUrl);
        setTourData(tours);
      }
    },
    [setTourData, location]
  );

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
          <TourDropDown
            handleToggleFilter={handleToggleFilter}
            handleNoSort={handleNoSort}
            handleSortTourIncrease={handleSortTourIncrease}
            handleSortTourDecrease={handleSortTourDecrease}
            isShowDropDown={isShowDropDown}
            sortTour={sortTour}
          />
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                <TourFilter countries={countries} />
              </div>
              <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12 col-12">
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
