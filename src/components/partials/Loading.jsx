import loader from "/loader9.gif"

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1f1e24 ] rgb(31, 30, 36) hsl(250, 9%, 13%)hsv(250, 17%, 14%)">
      <img className="h-[50%]  object-cover" src={loader} alt="Loading..." />
    </div>
  )
}

export default Loading