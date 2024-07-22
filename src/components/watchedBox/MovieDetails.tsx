import { useEffect, useRef, useState } from "react";
import StarRating from "../features/StarRating";
import Loader from "../features/Loader";
import { MovieDataType } from "../../App";
import useKey from "../Hooks/useKey";


type MovieDetailsProps = {
  SelectedId: string;
  handleCloseMovie: () => void;
  handleAddWatched:(objL:MovieDataType)=>void
  watched:MovieDataType[]
};

const KEY = import.meta.env.VITE_KEY

export default function MovieDetails({SelectedId,handleCloseMovie,handleAddWatched,watched}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating,setUserRating ] = useState<number>(0)
  const countRef = useRef<number>(0)

  useEffect(()=>{
   if(userRating) countRef.current = countRef.current + 1
  },[userRating])

  const isWatched =  watched.map((movie)=>movie.imdbID).includes(SelectedId)
  const watchedUserRating = watched.find(movie => movie.imdbID === SelectedId)?.userRating

  function handleAdd (){

    const newWatchMovie:MovieDataType = {
    imdbID: SelectedId,
    Title:movie?.Title,
    Year:movie?.Year,
    Poster:movie?.Poster,
    Runtime:movie?.Runtime,
    imdbRating:movie?.imdbRating,
    userRating:userRating,
    countRatingDecisions:countRef.current,

  }

    handleAddWatched(newWatchMovie)
    handleCloseMovie()
  }




  useEffect(() => {
    async function getMovieDetails(): Promise<void | Error | null> {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${SelectedId}`
        );
        if (!res.ok)
          throw new Error(
            "Someting went wrong with fetching the movies details"
          );

        const data = await res.json();
        
        if (data.Response === "False") throw new Error("movie not found");

        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getMovieDetails();
  }, [SelectedId]);

  useEffect(()=>{
    if(!movie?.Title) return 
    document.title = `Movie | ${movie?.Title}`

    return () => { document.title = "usePopcorn" }
    // return function(){ document.title = "usePopcorn"} 
  },[movie])

  useKey("Escape",handleCloseMovie)
  

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie?.Title} moive`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                {" "}
                <span>⭐</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {
                !isWatched ?
              <>
                <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {
                userRating > 0 &&
                <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
              }

              </>
              : <p>You rated this movie {watchedUserRating} <span>⭐</span></p>
            }
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
