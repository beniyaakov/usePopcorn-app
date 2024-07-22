
type ErrorMessage = {
    message:string
}

export default function ErrorMessage({message}: ErrorMessage) {
  return (
    <div className='error'><span>⛔</span>{message}</div>
  )
}