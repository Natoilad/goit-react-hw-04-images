import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, togleModal }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem togleModal={togleModal} images={images} />
    </ul>
  );
};

ImageGallery.propTypes = {
  togleModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
