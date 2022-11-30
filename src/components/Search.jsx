import React, { useState } from 'react'

function Search(props) {

  // 1. Estados
  const [ search, setSearch ] = useState("");

  // Eventos
  const handleSearch = (e) => {
    setSearch(e.target.value)
    props.searchList(e.target.value)
  }

  return (
    <div className="form-center container-fluid">
          <div className="row col-6 map_section">
        <form>
            <label htmlFor="search"></label>
            <input className="form-control" type="text" name='search' placeholder='Busca tu vino' onChange={handleSearch} value={search} />
            <br />
        </form>
        </div>
    </div>
  )
}

export default Search