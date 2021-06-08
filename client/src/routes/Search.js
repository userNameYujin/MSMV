import React from 'react';
import MovieCard from '../components/MovieCard';
import jsonData from './item.json';

const Search = () => {
  return (
    <div>
      {jsonData.items.map((item) => {
        return <MovieCard item={item}/>
      })}
    </div>
  )
}

export default Search;