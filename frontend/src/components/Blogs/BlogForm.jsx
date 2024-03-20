import { useRef, useState } from "react";
import { Form } from "react-router-dom";
import "./Blog.css";

function BlogForm() {
  const inputPhotoRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);

  function handleImageClick() {
    inputPhotoRef.current.click();
  }

  function handleChangeImage(event) {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);
  }

  function handleRemoveImage(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
  }

  return (
    <Form className="mb-5">
      <div className="form-item-container">
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Tiêu đề blog"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="form-label">
            Quốc gia
          </label>
          <select id="country" className="form-select form-md">
            <option value="Viet nam">Việt nam</option>
            <option value="Viet nam">Việt nam</option>
            <option value="Viet nam">Việt nam</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label">Hình ảnh</label>
          <div className="form-img-upload_tip">
            {
              "Có thể tải lên các file ảnh (định dạng jpg, png, jpeg, gif, webp)"
            }
          </div>
          <div className="form-img-upload__imgs">
            <div
              className="form-img-upload__add form-img-upload__img"
              onClick={handleImageClick}
            >
              <i className="ri-image-add-line"></i>
              <input
                type="file"
                name="photo"
                className="user-input__photo"
                ref={inputPhotoRef}
                multiple
                accept="image/jpg, image/png, image/jpeg, image/gif, image/webp"
                onChange={handleChangeImage}
              />
            </div>
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index} className="form-img-upload__img">
                  <img src={image} alt="image upload" className="upload-img" />
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
        <div className="mb-5">
          <label htmlFor="description" className="form-label">
            Bài bình luận
          </label>
          <textarea
            className="form-control"
            rows="5"
            id="description"
            name="description"
          ></textarea>
        </div>
        <div className="mb-4 w-100 text-center">
          <button type="submit" className="button btn-submit">
            Xác nhận
          </button>
        </div>
      </div>
    </Form>
  );
}

export default BlogForm;
