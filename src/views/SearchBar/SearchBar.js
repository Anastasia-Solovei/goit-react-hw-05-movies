import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import s from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setInput(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (input.trim() === '') {
      toast.error('Please, enter your query!');
      return;
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={input}
        onChange={handleInputChange}
      />

      <button type="submit" className={s.SearchbarBtn}>
        <span>Search</span>
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
