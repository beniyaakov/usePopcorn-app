import { MovieDataType } from "../../App"

type NumResultsProps = {
  movies:MovieDataType[]
}

export default function NumResults({movies}:NumResultsProps) {
  return (
    <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
  )
}