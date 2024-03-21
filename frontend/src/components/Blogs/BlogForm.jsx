import { Suspense, useRef, useState } from "react";
import { Await, Form } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./Blog.css";

function BlogForm({ countries, blog = null }) {
  const inputPhotoRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [description, setDescription] = useState(blog ? blog.description : "");

  function handleImageClick() {
    inputPhotoRef.current.click();
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

  function handleRemoveImage(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
  }

  function handleSumbitForm(event) {
    event.preventDefault();

    const data = {
      title: event.target.title.value,
      country: event.target.country.value,
      description: description,
      photo: selectedImages,
    };

    console.log(data);
  }

  return (
    <Form className="mb-5" onSubmit={handleSumbitForm}>
      <div className="form-item-container">
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Tiêu đề blog"
            defaultValue={blog ? blog.title : ""}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="form-label">
            Quốc gia
          </label>
          <Suspense
            fallback={
              <p style={{ textAlign: "center" }}>Loading Countries...</p>
            }
          >
            <Await resolve={countries}>
              {(loadedCountry) => (
                <select
                  id="country"
                  name="country"
                  className="form-select form-md"
                  defaultValue={blog && blog.country.name}
                >
                  {loadedCountry.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </Await>
          </Suspense>
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
        {blog.photo.length > 0 && (
          <div className="mb-4">
            <label className="form-label">Hình ảnh hiện tại</label>
            <div className="form-img-upload__imgs">
              {blog.photo.map((image, index) => (
                <div key={index} className="form-img-upload__img">
                  <img
                    src={`http://localhost:8080/img/post/${image}`}
                    alt="image upload"
                    className="upload-img"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Bài bình luận
          </label>
          <ReactQuill
            theme="snow"
            className="quill-height"
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="mb-4 w-100 text-center">
          <button type="submit" className="button btn-submit">
            Đăng bài
          </button>
        </div>
      </div>
    </Form>
  );
}

export default BlogForm;
