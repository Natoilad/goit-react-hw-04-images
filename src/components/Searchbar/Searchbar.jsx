import { useState } from 'react';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  // state = {
  //   value: '',
  // };

  return (
    <header className={css.searchbar}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(value.trim());
          setValue('');
          // this.setState({ value: '' });
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
          value={value}
          onChange={e => {
            setValue(e.currentTarget.value);
            // this.setState({ value: e.currentTarget.value });
          }}
        />
      </form>
    </header>
  );
};
