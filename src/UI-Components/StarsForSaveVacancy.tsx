import React from 'react'
import star from '../assets/Star.png'


export const StarForSaveVacancy = React.memo((id:number)=>{

    const SavaOrDeleteVacancy=()=>{
        let mi_array:any=[]
        const currentData  = localStorage.getItem("Id_Vacancies")
        mi_array = currentData ? JSON.parse(currentData) : [];
        mi_array.push(id);
        const json_transform = JSON.stringify(mi_array);
        localStorage.setItem("Id_Vacancies", json_transform);
    }
    return (
        <>
        <img onClick={SavaOrDeleteVacancy} src={star} alt='star' />
        </>
    )
})