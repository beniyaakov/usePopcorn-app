import {useEffect} from 'react'



export default function useKey(key:string,action:()=>void) {


    useEffect(()=>{

        function callBack(e:KeyboardEvent){
          
          if(e.code.toLowerCase() === key.toLowerCase()){
            action()
          }
        }
    
        document.addEventListener("keydown",callBack)
      
        return ()=>{
          document.removeEventListener("keydown",callBack)
        }
      
      },[action,key])

}