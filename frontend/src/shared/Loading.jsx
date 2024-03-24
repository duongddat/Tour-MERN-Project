import loadingGif from "../assets/img/loading.gif";
import "./Loading.css";

function Loading() {
  return (
    <div className="wrapper-loading h-100vh d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <h3 className="text-loading" data-text="HoYoViVu">
          HoYoViVu
        </h3>
        <img className="img-loading" src={loadingGif} alt="loading gif" />
      </div>
    </div>
  );
}

export default Loading;
