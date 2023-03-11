import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escapeKey);
  }
  escapeKey = evt => {
    if (evt.code === 'Escape') {
      console.log('press esc');
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeKey);
  }

  backDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div onClick={this.backDropClick} className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}
