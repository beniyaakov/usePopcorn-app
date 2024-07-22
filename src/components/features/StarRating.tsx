import { useState } from "react";
import Star from "./Star";

type StarRatingProps = {
  maxRating?: number;
  color?:string,
  size?:number
  className?:string
  messages?:string[] 
  defaultRating?:number
  onSetRating?:(value:number)=>void
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};



export default function StarRating({ maxRating = 1,color="#fcc419" ,size=48 ,messages=[],className,defaultRating=0,onSetRating}: StarRatingProps) {
   const [rating, setRating] = useState<number>(defaultRating);
   const [tempRating,setTempRating] = useState<number>(0)

   const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize:`${size / 1.5}px`
  };

    function handleRating(rating:number){
        setRating(rating)
        
        if (onSetRating) {
          onSetRating(rating) 
        }
    }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star key={i} onRate={() => handleRating(i + 1)} full={tempRating ? tempRating>= i +1 : rating >= i+1} onHoverIn={() => setTempRating(i+1)}  onHoverOut={() => setTempRating(0)} color={color} size={size}/>
        ))}
      </div>
      <p style={textStyle}>{messages?.length === maxRating ? messages[tempRating ? tempRating -1 : rating -1]:tempRating || rating || ""}</p>
    </div>
  );
}


