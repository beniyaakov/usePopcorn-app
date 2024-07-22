
import {MovieDataType } from '../../App'
import Movie from './Movie';

type MovieListProps = {
  movies:MovieDataType[]
  handleSelectMovie:(id:string)=>void
}


export default function MovieList({movies,handleSelectMovie}: MovieListProps) {
  return (
    <ul className="list list-movies">
            {movies?.map((movie) => (
             <Movie {...movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie} />
            ))}
          </ul>
  )
}