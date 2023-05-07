import React, { useState } from "react";
import SearchIcon from "../../assets/icons/busqueda.svg";

function Search(props) {
  const [query, setQuery] = useState("");

  function handleClickSearch() {
    props.onHandleSearch(query);
  }

  return (
    <div>
      <div className="search min-w-40 max-w-2xl">
        <div className="search__wrapper">
          <input
            className="search__input"
            type="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            onKeyDown={handleClickSearch}
            autoFocus
          />
          <img className="search__icon" src={SearchIcon} alt="searchBtn" />
        </div>
        <button className="search__button" onClick={handleClickSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
