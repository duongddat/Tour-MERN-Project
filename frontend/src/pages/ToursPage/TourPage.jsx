import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import headingBorderImg from "../../assets/img/heading-border.webp";
import SearchBar from "../../shared/SearchBar";
import TourDropDown from "../../components/common/TourDropDown";
import TourListPagination from "../../components/Tours/TourListPagination";
import TourFilter from "../../components/common/TourFilter";
import "./TourPage.css";
// import { sortTourHTTP } from "../../https";

const defaultSort = {
  name: "",
  path: "",
};
export default function TourPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tours, countries } = useLoaderData();
  const [tourData, setTourData] = useState([]);
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

  //============== Handle Sort===================
  function handleSort(path) {
    const currentURL = location.pathname + location.search;
    const querySort = path;

    if (querySort || querySort === "") {
      const hasQuery = currentURL.includes("?");
      const separator = hasQuery ? "&" : "?";

      let sortUrl = currentURL;

      if (querySort !== "") {
        const sortRegex = /(\?|&)sort=([^&]+)/;
        const sortMatch = sortUrl.match(sortRegex);

        if (sortMatch) {
          sortUrl = sortUrl.replace(sortRegex, `$1${querySort}`);
        } else {
          sortUrl += separator + querySort;
        }
      } else {
        const sortRegex = /(\?|&)sort=([^&]+)/;
        sortUrl = sortUrl.replace(sortRegex, "");
      }

      navigate(sortUrl);
    }
  }

  //===============Handle Filter==============
  function handleFilter(paramName, paramValue) {
    let currentURL = location.pathname + location.search;

    if (!paramName) {
      currentURL = currentURL.replace(
        /(\?|&)(ratingsAverage|duration)(\[lte\]|\[gte\])=([^&]+)/g,
        ""
      );
      navigate(currentURL);
      return;
    }
    const regex = new RegExp(
      `(\\?|&)${paramName}(\\[lte\\]|\\[gte\\])=([^&]+)`,
      "g"
    );
    currentURL = currentURL.replace(regex, "$1");

    const hasQuery = currentURL.includes("?");
    const separator = hasQuery ? "&" : "?";

    const filterUrl = currentURL + separator + paramValue;

    navigate(filterUrl);
  }

  return (
    <div className="section-bg p-5 d-flex flex-column gap-80">
      <div className="d-flex flex-column gap-80">
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
                <TourFilter countries={countries} onFilter={handleFilter} />
              </div>
              <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12 col-12">
                <TourListPagination
                  tours={tourData}
                  classes="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12"
                  itemsPerPage={8}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
