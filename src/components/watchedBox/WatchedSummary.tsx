import { MovieDataType } from "../../App";
type WatchedSummaryProps = {
  watched: MovieDataType[];
};

const average = (arr: (number | undefined)[]) => {

  return arr.reduce((acc, cur, _, arr) => {
    if (!acc || !cur) return;
      
    return acc + cur / arr.length;
  }, 0);
};

export default function WatchedSummary({ watched }: WatchedSummaryProps) {
  
  const avgImdbRating = average(watched.map((movie) => Number(movie.imdbRating)));

  const avgUserRating = average(watched.map((movie) => movie.userRating));

  const avgRuntime = average(watched.map((movie) =>Number(movie?.Runtime?.split(" ")[0])));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating?.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating?.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
