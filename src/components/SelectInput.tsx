
interface selectInput{  
  label:string
  data?: Array<object>
  passKey:string,  
  passValue:string,  
  inputValue:(selectedValue: string) => void;
}

interface myobject{
  [index: string] : number | string
}

export default function SelectInput({label,data,passKey,passValue,inputValue}:selectInput) {

  return (
    <div>
         <div className='input-group relative mt-5'>
        <select className=' w-72  px-2 py-3 border-2 border-[#ADB7BE] rounded-md bg-white outline-black ' onChange={(e) => inputValue(e.target.value)}>
                     <option  disabled selected  hidden className="text-[#ADB7BE]">select {label.toLowerCase()}</option>          
                     <option value="">ALL</option>                    
                    {/* <option value="">2</option>
                    <option value="">3</option> */}
                    

                    {data?.map((items) => {
                      const myitem:myobject = items as myobject;

                      return (<option value={myitem[passValue]} key={myitem[passKey]}>{myitem[passValue]}</option>);
                    }
                    
                     )}
                </select>
        <label className='text-[14px] absolute top-[-15px] left-[10px] bg-blue-500 bg-white p-1' > {label} </label>
        </div>

    </div>
  )
}
