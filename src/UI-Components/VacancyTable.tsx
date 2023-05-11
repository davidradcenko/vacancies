import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store/store"
import { VacancyDataType, deleteStateSavedVacanciesAC, getCurrentsVacanciesTC, getPublishVacanciesTC } from "../Reducer/initialazedReducer"
import location from '../assets/Location.png'
import React, { useEffect } from "react"
import {Link, Navigate, useNavigate} from "react-router-dom";
import { StarForSaveVacancy } from "./StarsForSaveVacancy"
import { nanoid } from 'nanoid'

export const VacancyTable= React.memo(()=>{
    const ListofVacancies = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.currentVacancies)

	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		navigate(`/Info/${id}`)  
	}


	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
    return <>
    {ListofVacancies.map((item)=>{
							return <div key={item.id} className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(item.id)} >{item.profession}</p>
									<StarForSaveVacancy id={item.id} active={mi_array.includes(item.id)?true:false}/>
								</div>

								<div className='Salary-and-TypeWork'>
									{item.payment_from==0
									?<p className='In-Salary'>з/п Не указано</p>
									:<p className='In-Salary'>з/п от {item.payment_from} {item.currency}</p>}
									
									<p className='In-Dart'>•</p>
									<p className='In-Type'>{item.type_of_work}</p>
								</div>

								<div className='location'>
									<img src={location} alt='location' />
									<p>{item.town}</p>
								</div>
							</div>
						</div>
						})}
    </>
})




export const SavedTableVacancies= React.memo(()=>{
	
    const ListofVacancies = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.savedVacancies.vacancies)
    const currentPade = useSelector<RootState, number>(state => state.initialazed.savedVacancies.currentPage)
	debugger
	const dispatch = useAppDispatch()
	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		navigate(`/Info/${id}`)  
	}

	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];

	// useEffect(()=>{
	// 	dispatch(deleteStateSavedVacanciesAC())
	// 	for(let i=0;i<=mi_array.length-1;i++){
	// 		dispatch(getCurrentsVacanciesTC(1,mi_array[i]))
	// 	}
	// },[])


	useEffect(()=>{
		dispatch(deleteStateSavedVacanciesAC())
		for(let i=currentPade*4;i<=mi_array.length;i++){
			dispatch(getCurrentsVacanciesTC(1,mi_array[i]))
		}
	},[currentPade])
    return <>
    {ListofVacancies.map((item)=>{
						return <div key={nanoid()} className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(item.id)} >{item.profession}</p>
									<StarForSaveVacancy id={item.id} active={mi_array.includes(item.id)?true:false}/>
								</div>

								<div className='Salary-and-TypeWork'>
									{item.payment_from==0
									?<p className='In-Salary'>з/п Не указано</p>
									:<p className='In-Salary'>з/п от {item.payment_from} {item.currency}</p>}
									
									<p className='In-Dart'>•</p>
									<p className='In-Type'>{item.type_of_work}</p>
								</div>

								<div className='location'>
									<img src={location} alt='location' />
									<p>{item.town}</p>
								</div>
							</div>
						</div>
						})}
    </>
})