import { useCallback, useState } from "react";
import Main from "./components/pages/Main";
import Box from "./components/pages/Box";
import MovieList from "./components/movieBox/MovieList";
import WatchedSummary from "./components/watchedBox/WatchedSummary";
import WatchedMovieList from "./components/watchedBox/WatchedMovieList";
import Loader from "./components/features/Loader";
import ErrorMessage from "./components/features/ErrorMessage";
import MovieDetails from "./components/watchedBox/MovieDetails";
import useMovies from "./components/Hooks/useMovies";
import useLocalStorageState from "./components/Hooks/useLocalStorageState";
import NavBar from "./layouts/NavBar/NavBar";
import Search from "./layouts/NavBar/Search";
import NumResults from "./layouts/NavBar/NumResults";

export type MovieDataType = {
  imdbID?: string | undefined;
  Title?: string | undefined;
  Year?: string | undefined;
  Poster?: string | undefined;
  Runtime?: string | undefined;
  imdbRating?: string| undefined;
  userRating?: number | undefined;
  Plot?: string | undefined;
  Released?: string | undefined;
  Actors?: string | undefined;
  Director?: string | undefined;
  Genre?: string | undefined;
  countRatingDecisions?:number
};

const KEY = import.meta.env.VITE_KEY



export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const url:string =`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`


  const [watched, setWatched]  = useLocalStorageState<MovieDataType[]>([],"watched")

  const handleCloseMovie = useCallback(()=>{
       setSelectedId(null)
   },[setSelectedId])


  const {movies,error,isLoading} = useMovies<MovieDataType[]>(query,url,handleCloseMovie)

  function handleSelectMovie(id:string){
      setSelectedId(selectedId => id===selectedId ? null : id)
  }


  function handleAddWatched(movie:MovieDataType){
    setWatched(watched => [...watched,movie])
  }

  function handleDeleteWatched(id:string|undefined){
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }




  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails SelectedId={selectedId} handleCloseMovie={handleCloseMovie} handleAddWatched={handleAddWatched} watched={watched}  />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} handleDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}









