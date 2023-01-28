import React, { useState } from "react";

function Search(props) {
  // 1. Estados
  const [search, setSearch] = useState("");

  // Eventos
  const handleSearch = (e) => {
    setSearch(e.target.value);
    props.searchList(e.target.value);
  };

  return (
    // <div className="form-center container-fluid">
    <div className="super-container">
        <form className="form">
          <label htmlFor="search"></label>
          <input
            className="edit-input"
            type="text"
            name="search"
            placeholder="Busca tu vino"
            onChange={handleSearch}
            value={search}
          />
        </form>
    </div>
  );
}

export default Search;
