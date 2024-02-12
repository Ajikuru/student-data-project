
import SelectInput from '../components/SelectInput'
import CustomButton from '../components/CustomButton'

// import {tableRows} from '../data'

import { useState, useRef, useEffect } from 'react';
import { useGetAllStudentQuery,useGetAllStateQuery,useGetAllLevelQuery,useGetAllAgeQuery,useGetAllGenderQuery} from '../api/studentSlice';
import ResultTemplate from './ResultTemplate';
import jsPDF from 'jspdf';


function simulateLoading(){
    return new Promise((resolve) =>setTimeout(resolve,800));
}
interface listStudents {
    id:number,
    surname:string,
    firstname:string,
    age:number,
    gender:string,
    level:string,
    state:string}

function Home() {


    const tableHeading = ['S/N','Surname','FirstName','Age','Gender','Level','State','Action'];
    const[studentClicked,setStudentClicked] = useState(0);


    const[age,setAge] = useState("");
    const[state,setState] = useState("");
    const[level,setLevel] = useState("");
    const[gender,setGender] = useState("");
    const[listStudents, setListStudents] = useState([]);
    



    const { data: data = [], isSuccess } = useGetAllStudentQuery("");
    const { data: stateData = [] } = useGetAllStateQuery("");
    const { data: levelData = [] } = useGetAllLevelQuery("");
    const { data: ageData = [] } = useGetAllAgeQuery("");
    const { data: genderData = [] } = useGetAllGenderQuery("");

    const[isDowload, setDownload] = useState(false);
 

    useEffect( () => {
        if(isSuccess){
            setListStudents(data.data.students);
        }
        
    },[isSuccess,data]);

    
const reportTemplateRef = useRef<HTMLDivElement>(null);

const handleGeneratePdf = async (e:React.MouseEvent<HTMLButtonElement>,id:number) => {
    

    //e.target.innerHTML = "Loading";
   const target = e.target as HTMLButtonElement

   target.innerHTML = "...please wait";

     setDownload(true);
    setStudentClicked(id);

await simulateLoading();

    const doc = new jsPDF({
        orientation: "p",
        format: 'a4',
        unit:'pt'
    });
    
    
    if (reportTemplateRef.current){

        doc.html(reportTemplateRef.current, {
           
            async callback(doc) {
               
                    await doc.save('document');  
                    setDownload(false);
                    target.innerHTML = "Download";
             
             },
            x: 10, // X position on the page
            y: 10, // Y position on the page
        
        }); 

    }
    

};

const handleClick = ()=>{
    //console.log("click");
    // console.log(age);
    const filteredRows = data.data?.students.filter((row: listStudents) => {
        return (
          (state === "" || row.state.toLowerCase() === state.toLowerCase()) &&
          (gender === "" || row.gender.toLowerCase() === gender.toLowerCase()) &&
          (age === "" || row.age === parseInt(age)) &&
          (level === "" || row.level === level)
        );
      });

    setListStudents(filteredRows);
}



  return (
    <div className='page-width'>

    <h1 className='text-[40px] font-bold'> Student Data Table</h1>

    <div className='m-container spacing'>
        <p className='text-[24px] leading-1'>Filter Student Table By:</p>

        <div className='flex gap-10 input-container flex-wrap items-end  mt-10'>


           <SelectInput label= "Age"  data={ageData.data} passKey='id' passValue='age' inputValue={setAge} />
           <SelectInput label= "State" data={stateData.data}  passKey='id' passValue='name'  inputValue={setState} />
           <SelectInput label= "Level" data={levelData.data}  passKey='id' passValue='level' inputValue={setLevel} />
           <SelectInput label= "Gender" data={genderData.data} passKey='id' passValue='gender' inputValue={setGender}  />

            <CustomButton title = "Search" handleClick={handleClick}/>
            
        </div>

    </div>

    <div className='m-container spacing'>
      
      <div className='h-[432px] overflow-auto table-scoll-bar'>
      <table className='w-full relative'>
        <thead className='bg-[#F9F9FA]'>
        <tr>
           {tableHeading.map((item) => (<th className='p-3 text-[14px] text-left' key={item}>{item}</th>) )}
        </tr>
        </thead>

        <tbody className=' divide-y divide-[#ECECEC]'>

            {isSuccess &&  listStudents.map((items:listStudents,key) => {
                return (
                    <tr key={key}>
                        <td className='p-3 text-left text-[14px]'>{items.id}</td>
                        <td className='p-3 text-left text-[14px]'>{items.surname}</td>
                        <td className='p-3 text-left text-[14px]'>{items.firstname}</td>
                        <td className='p-3 text-left text-[14px]'>{items.age}</td>
                        <td className='p-3 text-left text-[14px]'>{items.gender}</td>
                        <td className='p-3 text-left text-[14px]'>{items.level}</td>
                        <td className='p-3 text-left text-[14px]'>{items.state}</td>
                        <td className='p-3 text-left text-[14px]'>
                            <button 
                            className='px-4 py-3 bg-[#46C35F] text-white w-46'
                            onClick={ (e) => handleGeneratePdf(e,items.id) } disabled={isDowload}>Download</button>
                         
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table> 
      </div>

<div className='h-0 overflow-hidden'>

<div ref={reportTemplateRef} >
       <ResultTemplate 
       id={studentClicked} 
       />
</div>

</div>
    

    </div>


        
    </div>
  )
}

export default Home