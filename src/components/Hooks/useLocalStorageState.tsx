import {useState,useEffect} from 'react'


type UseLocalStorageStateReturn<T> = [T,React.Dispatch<React.SetStateAction<T>>]
export default function useLocalStorageState<T>(initialStat:[],key:string):UseLocalStorageStateReturn<T>{

    const [value, setValue] = useState<T>(function(){

        const storedValue = localStorage.getItem(key)
        return storedValue  ? JSON.parse(storedValue) : initialStat;
    
    });


    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    
      },[value,key])
    
      

  return [value,setValue]
}



