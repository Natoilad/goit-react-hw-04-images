import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const escapeKey = evt => {
      if (evt.code === 'Escape') {
        console.log('press esc');
        closeModal();
      }
    };
    window.addEventListener('keydown', escapeKey);
    return () => {
      window.removeEventListener('keydown', escapeKey);
    };
  }, [closeModal]);
  const backDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };
  return (
    <div onClick={backDropClick} className="Overlay">
      <div className="Modal">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
