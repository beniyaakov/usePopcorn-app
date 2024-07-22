import {useRef} from "react"
import useKey from "../../components/Hooks/useKey"

type SearchProps = { 
  query:string
  setQuery:(e:string)=>void
}

export default function Search({query,setQuery}:SearchProps) {

  const inputEL = useRef<HTMLInputElement>(null)

  useKey("Backspace",function(){
    
    if (document.activeElement === inputEL.current) {
      return
    }
    inputEL.current?.focus()
    setQuery("")
  })

  

  return (
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEL}
  />
  )
}