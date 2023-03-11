import { Component } from 'react';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(this.state.value.trim());
            this.setState({ value: '' });
          }}
          className={css.SearchForm}
        >
          <button type="submit" className={css.SearchFormButton}>
            <AiOutlineSearch size="25" />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={e => {
              this.setState({ value: e.currentTarget.value });
            }}
          />
        </form>
      </header>
    );
  }
}
