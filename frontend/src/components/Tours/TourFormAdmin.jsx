import { useRef, useState } from "react";
import { Form } from "react-router-dom";
import Select from "react-select";

import TourLocationFormAdmin from "./TourLocationFormAdmin";

function TourFormAdmin() {
  const inputPhotoRef = useRef();
  const inputImageCoverRef = useRef();
  const [selectedImg, setSelectedImg] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  function handleImageCoverClick() {
    inputImageCoverRef.current.click();
  }

  function handleImageClick() {
    inputPhotoRef.current.click();
  }

  function handleChangeImageCover(event) {
    const selectedFile = event.target.files[0];
    const urlImageCover = URL.createObjectURL(selectedFile);
    setSelectedImg(urlImageCover);
  }

  function handleChangeImage(event) {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return {
        file: file,
        url: URL.createObjectURL(file),
      };
    });

    setSelectedImages(imagesArray);
  }

  function handleRemoveImageCover() {
    setSelectedImg(null);
  }

  function handleRemoveImage(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
  }

  function handleAddLocation(newLocation) {
    setLocations([...locations, newLocation]);
  }

  function handleLocationDelete(index) {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  }

  function handleSumbitForm(event) {
    event.preventDefault();
    console.log("Form Cha");
  }

  return (
    <Form onSubmit={handleSumbitForm} className="mb-5">
      <div className="form-item-container">
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Tên tour:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Tên tour du lịch"
          />
        </div>
        <div className="row mb-4">
          <div className="col-lg-4 col-md-4 col-12">
            <label htmlFor="price" className="form-label">
              Giá:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              placeholder="Giá tour du lịch"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            <label htmlFor="duration" className="form-label">
              Thời lượng:
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              className="form-control"
              placeholder="Thời lượng tour du lịch"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            <label htmlFor="maxGroupSize" className="form-label">
              Số lượng:
            </label>
            <input
              type="number"
              id="maxGroupSize"
              name="maxGroupSize"
              className="form-control"
              placeholder="Số lượng khách"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">Ảnh bìa:</label>
          <div className="form-img-upload_tip">
            {"Có thể tải lên các file ảnh (định dạng jpg, png, jpeg)"}
          </div>
          <div className="form-img-upload__imgs">
            <div
              className="form-img-upload__add form-img-upload__img"
              onClick={handleImageCoverClick}
            >
              <i className="ri-image-add-line"></i>
              <input
                type="file"
                name="imageCover"
                className="user-input__photo"
                ref={inputImageCoverRef}
                accept="image/jpg, image/png, image/jpeg"
                onChange={handleChangeImageCover}
              />
            </div>
            {selectedImg && (
              <div className="form-img-upload__img">
                <img
                  src={selectedImg}
                  alt="image upload"
                  className="upload-img"
                />
                <div
                  className="upload-status"
                  onClick={() => handleRemoveImageCover()}
                >
                  <i className="ri-close-line"></i>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">Ảnh thumbnail:</label>
          <div className="form-img-upload_tip">
            {"Có thể tải lên các file ảnh (định dạng jpg, png, jpeg)"}
          </div>
          <div className="form-img-upload__imgs">
            <div
              className="form-img-upload__add form-img-upload__img"
              onClick={handleImageClick}
            >
              <i className="ri-image-add-line"></i>
              <input
                type="file"
                name="images"
                className="user-input__photo"
                ref={inputPhotoRef}
                multiple
                accept="image/jpg, image/png, image/jpeg"
                onChange={handleChangeImage}
              />
            </div>
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index} className="form-img-upload__img">
                  <img
                    src={image.url}
                    alt="image upload"
                    className="upload-img"
                  />
                  <div
                    className="upload-status"
                    onClick={() => handleRemoveImage(image)}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Mô tả:
          </label>
          <textarea
            rows={6}
            id="description"
            name="description"
            className="form-control"
            placeholder="Mô tả du lịch"
          />
        </div>
        <div className="row mb-5">
          <div className="col-lg-6 col-md-6 col-12">
            <label htmlFor="country" className="form-label">
              Quốc gia:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Tên tour du lịch"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <label htmlFor="guide" className="form-label">
              Hướng dẫn viên:
            </label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="Chọn hướng dẫn viên"
              isMulti
            />
          </div>
        </div>
        <div className="form-item__wrapper mb-5">
          <div className="form-item__label">Vị trí bắt đầu:</div>
          <div className="row">
            <div className="col-lg-2 col-md-6 col-12">
              <label htmlFor="startLong" className="form-label">
                Kinh độ:
              </label>
              <input
                type="text"
                id="startLong"
                name="startLong"
                className="form-control"
                placeholder="Kinh độ"
              />
            </div>
            <div className="col-lg-2 col-md-6 col-12">
              <label htmlFor="startLat" className="form-label">
                Vĩ độ:
              </label>
              <input
                type="text"
                id="startLat"
                name="startLat"
                className="form-control"
                placeholder="Vĩ độ"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <label htmlFor="startAddress" className="form-label">
                Địa điểm:
              </label>
              <input
                type="text"
                id="startAddress"
                name="startAddress"
                className="form-control"
                placeholder="Địa điểm bắt đầu"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="mb-4">
                <label htmlFor="startDescription" className="form-label">
                  Mô tả:
                </label>
                <input
                  type="text"
                  id="startDescription"
                  name="startDescription"
                  className="form-control"
                  placeholder="Mô tả điểm bắt đầu"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <TourLocationFormAdmin onSubmit={handleAddLocation} />
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="form-item__wrapper">
              <div className="form-item__label">Danh sách điểm du lịch:</div>
              <div className="location-list">
                {locations.map((location, index) => (
                  <div key={index} className="location-item">
                    <div className="location-item__info">
                      <p>
                        {`Ngày ${location.locationDay}: ${location.locationDescription}`}
                      </p>
                      <span>
                        {`Vị trị [${location.locationLat}:${location.locationLong}]`}
                      </span>
                    </div>
                    <div
                      className="button-form__icon"
                      onClick={() => handleLocationDelete(index)}
                    >
                      <i className="ri-close-line"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 w-100 text-center">
          <button type="submit" className="button btn-submit">
            Xác nhận
          </button>
        </div>
      </div>
    </Form>
  );
}

export default TourFormAdmin;
