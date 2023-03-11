import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ images, togleModal }) => {
  return images.map(img => {
    const { id, webformatURL, tags } = img;
    return (
      <li
        key={id}
        onClick={evt => {
          togleModal(img.largeImageURL, img.tags);
        }}
        className="ImageGalleryItem"
      >
        <img
          loading="lazy"
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  togleModal: PropTypes.func.isRequired,
};
