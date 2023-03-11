// import { Component } from 'react';
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
  // const [total, setTotal] = useState(1);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [alt, setAlt] = useState(null);
  // state = {
  //   search: '',
  //   images: [],
  //   page: 1,
  //   loading: false,
  //   error: null,
  //   showModal: false,
  //   total: 1,
  //   isVisibleBtn: false,
  //   empty: false,
  // };
  const onSubmit = text => {
    setSearch(text);
    setImages([]);
    setPage(1);
    setLoading(false);
    setError(null);
    setShowModal(false);
    setIsVisibleBtn(false);
    // this.setState({
    //   search: text,
    //   images: [],
    //   page: 1,
    //   loading: false,
    //   error: null,
    //   toggleModal: false,
    //   isVisibleBtn: false,
    // });
  };
  useEffect(() => {
    if (!search) {
      return;
    }
    getPhotos(search, page);
  }, [page, search]);

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.search !== this.state.search ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.getPhotos(this.state.search, this.state.page);
  //   }
  // }
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => {
    //   return { page: prevState.page + 1 };
    // });
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
      // setTotal(totalHits);
      setIsVisibleBtn(page < Math.ceil(totalHits / 12));
      // setState(prevState => ({
      //   images: [...prevState.images, ...hits],
      //   total: totalHits,
      //   isVisibleBtn: page < Math.ceil(totalHits / 12),
      // }));
    } catch (error) {
      console.dir(error);
      setError(error);
      // setState({ error: error });
    } finally {
      setLoading(false);
      // setState({ loading: false });
    }
  };
  const openModal = (largeImageURL, alt) => {
    setShowModal(prevShowModal => !prevShowModal);
    setAlt(alt);
    setLargeImageURL(largeImageURL);

    // this.setState(({ showModal }) => {
    //   return { showModal: !showModal, largeImageURL, alt };
    // });
  };

  // const handleSubmit = search => {
  //   this.setState({
  //     search,
  //     images: [],
  //     page: 1,
  //     total: 1,
  //     loading: false,
  //     error: null,
  //   });
  // };

  const closeModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
    // this.setState(({ showModal }) => {
    //   return { showModal: !showModal };
    // });
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
