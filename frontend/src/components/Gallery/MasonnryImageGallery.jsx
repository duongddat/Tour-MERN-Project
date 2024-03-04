import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./Gallery_Image";

function MasonnryImageGallery() {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`Gallery ${index} image`}
            className="masonry-img"
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonnryImageGallery;
