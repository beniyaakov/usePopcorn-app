import { MovieDataType } from "../../App";
import WatchedMovie from "./WatchedMovie";

type WatchedMovieListProps = {
    watched:MovieDataType[]
    handleDeleteWatched:(id:string | undefined) => void
}

export default function WatchedMovieList({watched,handleDeleteWatched}: WatchedMovieListProps) {
  return (
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie {...movie} key={movie.imdbID} handleDeleteWatched={handleDeleteWatched} />
    ))}
  </ul>
  )
}