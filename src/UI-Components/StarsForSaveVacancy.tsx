import React from 'react'
import star from '../assets/Star.png'
import StarSelect from '../assets/StarSelect.png'


export const StarForSaveVacancy = React.memo((props:{id:number,active:boolean})=>{

    const  [activeStar,setActiveStar]=React.useState<boolean>(props.active)


    const SavaOrDeleteVacancy=()=>{
        let mi_array:any=[]
        const currentData  = localStorage.getItem("Id_Vacancies")
        mi_array = currentData ? JSON.parse(currentData) : [];
        if(mi_array.includes(props.id)){
            mi_array.map((item:number,index:number)=>{
                   if (item === props.id) { 
                    return   mi_array.splice(index, 1); 
                }
            })
            setActiveStar(false)
        }else{
            mi_array.push(props.id)
            setActiveStar(true)
        }
        const json_transform = JSON.stringify(mi_array);
        localStorage.setItem("Id_Vacancies", json_transform);
    }
    return (
        <>
        {activeStar
        ? <img onClick={SavaOrDeleteVacancy} src={StarSelect} alt='StarSelect' />
        : <img onClick={SavaOrDeleteVacancy} src={star} alt='star' />
        }
       
        </>
    )
})