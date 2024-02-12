
import style from '../results.module.css'

import {useGetResultQuery } from '../api/studentSlice';


interface result {
    coursecode:string
    title:string,
    credit_unit:number,
    grade:string,
    total_point:number
}

interface cummulative {
    unts:number,
    untd:number,
    gpts:number,
    gptd:number,
    gpats:number,
    gpatd:number,
    remarks:string,
}

interface studentResult{
    profile_picture:string,
    logo:string,
    data:{        
    id:number,
    surname:string,
    firstname:string,
    age:number,
    gender:string,
    level:string,
    state:string,
    reg_no:string,
    session:string,
    result: Array<result>,
    cummulative:cummulative
    }
    
}


export default function ResultTemplate({id=0}) {

       

    const {currentData:result ,isSuccess} = useGetResultQuery({id:id},{refetchOnMountOrArgChange:true});

    const fetchStudentReport:studentResult = result ?? {};

    



  return (isSuccess && result !=undefined)?(
    <div className={`${style.body} result-layout  max-w-[560px] font-arial `} >

      <div className='head flex justify-between items-center ' >
        
     
        <img src={`${fetchStudentReport.logo}`} alt=""  className=' w-24'/>        
        <div className='text-center'>

            <h2 className='text-[14px] font-arial p-2'> FREMONT COLLEGE OF EDUCATION </h2>
            <p className='text-[12px]'>No. 5 Raymond Osuman Street, PMB 2191 <br/>
            Maitama, Abuja, Nigeria
            </p>

            <h1 className='text-[20px] leading-[24px]  font-bold'> Post Graduate Diploma in Education</h1>
            <p className='text-[12px] leading-[2rem]'> Student First Semester     Statement Of Result</p>

        </div>
        

        <img src={fetchStudentReport.profile_picture} alt=""  className=' w-24'/>

      </div>

      <div className='mt-[3rem]'></div>

      <div className='flex justify-between'>
        <p>
            <span className='font-bold mr-5'>Name:</span>
            
            {`${fetchStudentReport.data.surname} ${fetchStudentReport.data.firstname}`}
        </p>
        <p>
            <span className='font-bold mr-5'>Reg. No:</span>
            
            {`${fetchStudentReport.data.reg_no}`}
        </p>
      </div>


      <div className='flex justify-between mt-5'>
        <p>
            <span className='font-bold mr-5'>Level:</span>
            {`${fetchStudentReport.data.level}`}
        </p>
        <p>
            <span className='font-bold mr-5'>Session:</span>
            {`${fetchStudentReport.data.session}`}
        </p>
      </div>


      <table className='w-full mt-5'>
      
        <thead>
            <tr className='bg-[#0D7590] text-white'>
                <th className='p-3 text-[12px] text-left'>S/N</th>
                <th className='p-3 text-[12px] text-left'>Course Code</th>
                <th className='p-3 text-[12px] text-left'> Course Title</th>
                <th className='p-3 text-[12px] text-left'>Unit</th>
                <th className='p-3 text-[12px] text-left'>Grade</th>
                <th className='p-3 text-[12px] text-left'>Total Point</th>
            </tr>
        </thead>
        <tbody>
            {
                fetchStudentReport.data.result.map((result:result,index:number) => {

                    return (<tr className='odd:bg-[#F2F2F2] even:bg-[#FFFFFF]' key={index}> 
                    <td className='p-3 text-left text-[14px]'>{index+1}</td>           
                    <td className='p-3 text-left text-[14px]'>{result.coursecode}</td>
                    <td className='p-3 text-left text-[14px]'>{result.title}</td>
                    <td className='p-3 text-left text-[14px]'>{result.credit_unit}</td>
                    <td className='p-3 text-left text-[14px]'>{result.grade}</td>
                    <td className='p-3 text-left text-[14px]'>{result.total_point}</td>               
                </tr>);
                })
            }
          
        </tbody>

      </table>


      <div className='mt-[3rem]'></div>

      <table className='w-[92%]'>
      
      <thead>
          <tr className='bg-[#0D7590] text-white'>
              <th className='p-3 text-[12px] text-left'>UNTS</th>
              <th className='p-3 text-[12px] text-left'>UNTD</th>
              <th className='p-3 text-[12px] text-left'> GPTS</th>
              <th className='p-3 text-[12px] text-left'>GPTD</th>
              <th className='p-3 text-[12px] text-left'>GPATS</th>
              <th className='p-3 text-[12px] text-left'>GPATD</th>
          </tr>
      </thead>
      <tbody>
          <tr className='odd:bg-[#F2F2F2] even:bg-[#FFFFFF]'> 
              <td className='p-3 text-left text-[12px]'>{fetchStudentReport.data.cummulative.unts}</td>           
              <td className='p-3 text-left text-[12px]'>{fetchStudentReport.data.cummulative.untd}</td>
              <td className='p-3 text-left text-[12px]'>{fetchStudentReport.data.cummulative.gpts}</td>
              <td className='p-3 text-left text-[12px]'>{fetchStudentReport.data.cummulative.gptd}</td>
              <td className='p-3 text-left text-[12px]'>{fetchStudentReport.data.cummulative.gpats}</td>
              <td className='p-3 text-left text-[12px]'>{fetchStudentReport.data.cummulative.gpatd}</td>
              
              
          </tr>

      </tbody>
    

    </table>

    <p>Remarks: <span className='text-[#0D7590]'>{fetchStudentReport.data.cummulative.remarks}</span></p>


    <div className='mt-[6rem]'>

        <div className='w-48 border-t-2 border-[#686868]'>
            <p>Registrar</p>

        </div>

    </div>


    
    </div>
  ):null
}



