import React from 'react'
import { useSelector } from 'react-redux'

import star from '../assets/Star.png'
import StarSelect from '../assets/StarSelect.png'
import { NewArrayOfIDs, deleteStateSavedVacanciesAC,setArrayIdAC } from '../Reducer/initialazedReducer'
import { RootState, useAppDispatch } from '../store/store'


/* ------- INTRODUCTION ------- */
/*
	This component is responsible Star logic for show vacancy saved or not and save, delete
*/
export const StarForSaveVacancy = React.memo((props:{id:number,active:boolean})=>{
    const dispatch = useAppDispatch()

    const currentPage = useSelector<RootState, number>(state => state.initialazed.savedVacancies.currentPage)
    const  [activeStar,setActiveStar]=React.useState<boolean>(props.active)

    // delete id  
    const SavaOrDeleteVacancy=()=>{
        const mi_array:Array<any> = GetIDsFormLocalStoradge()
        if(mi_array.includes(props.id)){
            mi_array.map((item:number,index:number)=>{
                   if (item === props.id) { 
                    return   mi_array.splice(index, 1); 
                }
            })
            setActiveStar(false)
            dispatch(deleteStateSavedVacanciesAC())
            dispatch(NewArrayOfIDs(mi_array,currentPage))
           
        }else{
            mi_array.push(props.id)
            dispatch(setArrayIdAC(mi_array))
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


// get array id`s saved vacancy
export const GetIDsFormLocalStoradge=()=>{
    let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
    return mi_array
}