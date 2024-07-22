import { MovieDataType } from '../../App'

type movieDataProps = MovieDataType & {
  handleDeleteWatched:(id:string | undefined) => void
}


export default function WatchedMovie({imdbID,Title,imdbRating,userRating,Runtime,Poster,handleDeleteWatched}: movieDataProps ) {
  return (
    <li key={imdbID}>
        <img src={Poster} alt={`${Title} poster`} />
        <h3>{Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{Runtime} </span>
          </p>
        <button className='btn-delete' onClick={()=>handleDeleteWatched(imdbID)}>X</button>
        </div>
      </li>
  )
}