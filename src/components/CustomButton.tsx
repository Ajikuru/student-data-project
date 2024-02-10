interface button{
    title:string,
    className?: string,
    handleClick: () => void; 
}

export default function CustomButton({title,handleClick,className=""} : button) {
  const addclass = className == "" ? "px-4 py-3 bg-[#46C35F] text-white rounded-md w-72" : className; 
  return (
    <div>
        <button className={`${addclass}`} onClick={handleClick}> {title}</button>
    </div>
  )
}
