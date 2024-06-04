import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import headingBorderImg from "../../assets/img/heading-border.webp";
import SearchBar from "../../shared/SearchBar";
import TourDropDown from "../../components/common/TourDropDown";
import TourListPagination from "../../components/Tours/TourListPagination";
import TourFilter from "../../components/common/TourFilter";
import "./TourPage.css";

const defaultSort = {
  name: "",
  path: "",
};

const getSessionStorage = (key, defaultValue) => {
  const saved = sessionStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function TourPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tours, countries } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [tourData, setTourData] = useState([]);
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [sortTour, setSortTour] = useState(
    getSessionStorage("sortTour", defaultSort)
  );
  const [ratingFilter, setRatingFilter] = useState(
    getSessionStorage("ratingFilter", "")
  );
  const [durationFilter, setDurationFilter] = useState(
    getSessionStorage("durationFilter", "")
  );
  const listRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("sortTour", JSON.stringify(sortTour));
  }, [sortTour]);

  useEffect(() => {
    sessionStorage.setItem("ratingFilter", JSON.stringify(ratingFilter));
  }, [ratingFilter]);

  useEffect(() => {
    sessionStorage.setItem("durationFilter", JSON.stringify(durationFilter));
  }, [durationFilter]);

  function handleScrollTopList() {
    const topPosition = listRef.current.offsetTop;
    window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
  }

  //================= Load Data ==================================
  useEffect(() => {
    async function getTour() {
      setLoading(true);
      try {
        setTourData(await tours);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
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
    name !== "" && UpdateQuery("sort", path);
    name == "" && UpdateQuery("resetSort");
    handleToggleFilter();
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

  function handleReset() {
    handleNoSort();
    setDurationFilter("");
    setRatingFilter("");
  }

  //============== Handle Filter & Sort Option=================
  function UpdateQuery(name = "", value = "") {
    let queryOptions = [];

    if (name !== "resetSort" && (name === "sort" || ratingFilter !== "")) {
      queryOptions.push(name === "sort" ? value : sortTour.path);
    }

    if (name !== "resetFilter") {
      if (name === "rating" || ratingFilter !== "") {
        queryOptions.push(name === "rating" ? value : ratingFilter);
      }

      if (name === "duration" || durationFilter !== "") {
        queryOptions.push(name === "duration" ? value : durationFilter);
      }
    }

    const queryString =
      queryOptions.length > 0 ? `${queryOptions.join("&")}` : "";

    let querySearch = "";

    const params = new URLSearchParams(location.search);
    const newParams = new URLSearchParams();

    if (params.has("key")) {
      newParams.set("key", params.get("key"));
    }

    if (
      params.has("duration") &&
      name !== "duration" &&
      durationFilter === ""
    ) {
      newParams.set("duration", params.get("duration"));
    }

    if (params.has("maxGroupSize")) {
      newParams.set("maxGroupSize", params.get("maxGroupSize"));
    }

    querySearch = newParams.toString();

    let optionURL =
      location.pathname +
      (querySearch !== "" || queryString !== "" ? "?" : "") +
      (querySearch !== "" ? querySearch : "") +
      (querySearch !== "" && queryString !== "" ? "&" : "") +
      (queryString !== "" ? queryString : "");

    navigate(optionURL);
  }

  return (
    <div className="section-bg pt-5 d-flex flex-column gap-80">
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
            <div className="row row-gap-5" ref={listRef}>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                <TourFilter
                  countries={countries}
                  onFilter={UpdateQuery}
                  ratingFilter={ratingFilter}
                  setRatingFilter={setRatingFilter}
                  durationFilter={durationFilter}
                  setDurationFilter={setDurationFilter}
                  onReset={handleReset}
                />
              </div>
              <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12 col-12">
                {loading && (
                  <h5 className="text-center mt-5">Loading tour......</h5>
                )}
                {!loading && (
                  <TourListPagination
                    tours={tourData}
                    classes="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12"
                    itemsPerPage={6}
                    onScroll={handleScrollTopList}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
