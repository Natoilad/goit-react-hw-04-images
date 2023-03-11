import { useState, useEffect } from 'react';
import { getImages } from 'Service/service';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [alt, setAlt] = useState(null);

  const onSubmit = text => {
    setSearch(text);
    setImages([]);
    setPage(1);
    setLoading(false);
    setError(null);
    setShowModal(false);
    setIsVisibleBtn(false);
  };
  useEffect(() => {
    if (!search) {
      return;
    }
    getPhotos(search, page);
  }, [page, search]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getPhotos = async (search, page) => {
    if (!search) return;
    setLoading(true);

    try {
      const { hits, totalHits } = await getImages(search, page);
      if (hits.length === 0) {
        setEmpty(true);
      }
      setImages(prevState => [...prevState, ...hits]);
      setIsVisibleBtn(page < Math.ceil(totalHits / 12));
    } catch (error) {
      console.dir(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const openModal = (largeImageURL, alt) => {
    setShowModal(prevShowModal => !prevShowModal);
    setAlt(alt);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery togleModal={openModal} images={images} />
      {loading && (
        <Loader
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        />
      )}

      {isVisibleBtn && <Button onLoadMore={onLoadMore} />}
      {error && <h1 textAlign="center">Sorry. Something goes wrong 😭</h1>}
      {empty && <h1 textAlign="center">Sorry. There are no images ... 😭</h1>}
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
};
