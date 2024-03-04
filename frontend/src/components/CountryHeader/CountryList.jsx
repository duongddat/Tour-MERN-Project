import CountryItem from "./CountryItem.jsx";
import "./Country.css";

const country_dummy = [
  {
    title: "Việt Nam",
    slug: "viet-nam",
  },
  {
    title: "Thái Lan",
    slug: "thai-lan",
  },
  {
    title: "Nhật Bản",
    slug: "nhat-ban",
  },
  {
    title: "Hà Nội",
    slug: "ha-noi",
  },
];
function CountryList() {
  return (
    <div className="country__list">
      {country_dummy.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
