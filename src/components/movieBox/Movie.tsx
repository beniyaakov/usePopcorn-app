import { MovieDataType } from "../../App";
type MovieProps = MovieDataType & {
  handleSelectMovie:(id:string)=>void

};

export default function Movie({imdbID,Year,Title,Poster,handleSelectMovie}: MovieProps) {
  if (!imdbID) return
  return (
    <li onClick={()=>handleSelectMovie(imdbID)} >
      <img src={Poster} alt={`${imdbID} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}
