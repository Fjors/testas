import React, { useState } from "react";
import "../styles/SearchBar.scss";

function SearchBar({ fetchImages, query, setQuery, setImages, setPage }) {
  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
    setPage(1);
    setImages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.search.value = "";
    fetchImages();
    searchHistory();
  };

  const searchHistory = () => {
    const localStorageData = window.localStorage.getItem("queries");
    let history;
    if (localStorageData === null) {
      history = [];
    } else {
      history = JSON.parse(localStorageData);
    }
    history.unshift(query);
    const removedEmptyVal = history.filter((e) => e);
    const sortedQueries = Array.from(new Set(removedEmptyVal));
    window.localStorage.setItem("queries", JSON.stringify(sortedQueries));
    setSearch(sortedQueries.slice(0, 5));
  };

  return (
    <div className="inputContainer">
      <datalist id="suggestions">
        {search.map((data, index) => (
          <>
            <option key={index}>{data}</option>
          </>
        ))}
      </datalist>
      <form onSubmit={handleSubmit}>
        <input
          className="textInput"
          onChange={(e) => handleChange(e)}
          onFocus={searchHistory}
          type="text"
          name="search"
          required
          placeholder="Search..."
          autoComplete="off"
          list="suggestions"
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
