import  { useState,memo } from 'react'
import { useSelector } from 'react-redux'


import { NewArrayOfIDs, deleteStateSavedVacanciesAC,setArrayIdAC } from '../Reducer/initialazedReducer'
import { RootState, useAppDispatch } from '../store/store'
import { ActionIcon } from '@mantine/core'


/* ------- INTRODUCTION ------- */
/*
	This component is responsible Star logic for show vacancy saved or not and save, delete
*/
export const StarForSaveVacancy = memo((props:{id:number,active:boolean,dataIlement:string})=>{
    const dispatch = useAppDispatch()

    const currentPage = useSelector<RootState, number>(state => state.initialazed.savedVacancies.currentPage)
    const  [activeStar,setActiveStar]=useState<boolean>(props.active)

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
        ? <ActionIcon data-elem={props.dataIlement} onClick={SavaOrDeleteVacancy} variant="transparent">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z" fill="#5E96FC" stroke="#5E96FC" strokeWidth="1.5"/>
                </svg>
        </ActionIcon>


        : <ActionIcon data-elem={props.dataIlement} onClick={SavaOrDeleteVacancy} variant="transparent">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z" stroke="#ACADB9" strokeWidth="1.5"/>
            </svg>
         </ActionIcon>
        }
       
        </>
    )
})


/* ------- INTRODUCTION ------- */
/*
	This component is responsible Star logic for show vacancy saved or not and save, delete in main page "/"
*/
export const StarForMainSaveVacancy = memo((props:{id:number,active:boolean,dataIlement:string})=>{
    const dispatch = useAppDispatch()

    const  [activeStar,setActiveStar]=useState<boolean>(props.active)

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
        ?  <ActionIcon data-elem={props.dataIlement} onClick={SavaOrDeleteVacancy} variant="transparent">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z" fill="#5E96FC" stroke="#5E96FC" strokeWidth="1.5"/>
                </svg>
        </ActionIcon>
            
        : <ActionIcon data-elem={props.dataIlement} onClick={SavaOrDeleteVacancy} variant="transparent">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z" stroke="#ACADB9" strokeWidth="1.5"/>
            </svg>
         </ActionIcon>
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