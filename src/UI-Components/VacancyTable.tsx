import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store/store"
import { VacancyDataType, deleteStateSavedVacanciesAC, getCurrentsVacanciesTC, getPublishVacanciesTC } from "../Reducer/initialazedReducer"
import location from '../assets/Location.png'
import React, { useEffect, useState } from "react"
import {Link, Navigate, useNavigate} from "react-router-dom";
import { StarForSaveVacancy } from "./StarsForSaveVacancy"
import { nanoid } from 'nanoid'
import { useTransition, animated } from "react-spring";
export const VacancyTable= React.memo(()=>{
    const ListofVacancies = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.currentVacancies)

	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		const v=JSON.stringify(ListofVacancies[id])
		debugger
		navigate(`/Info/${encodeURIComponent(v)}`)  
	}


	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
    return <>
    {ListofVacancies.map((item,index)=>{
							return <div key={item.id} className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(index)} >{item.profession}</p>
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

	const dispatch = useAppDispatch()
	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		const v=JSON.stringify(ListofVacancies[id])
		navigate(`/Info/${encodeURIComponent(v)}`)  
	}

	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
	
	const [nowArray,setnowArray]=useState<Array<VacancyDataType>>([])



	useEffect(()=>{
		dispatch(deleteStateSavedVacanciesAC())
	},[])
	useEffect(()=>{
		let iteral=0
		let start=(currentPade*4)-4
		if(currentPade==1){
			start=0
		}
		for(let i=start;i<=mi_array.length-1;i++){
			if(iteral==4){
				break
			}
			iteral=iteral+1
			dispatch(getCurrentsVacanciesTC(currentPade,mi_array[i]))
		}
	},[currentPade])
	useEffect(()=>{
		    const nowArray=ListofVacancies
			let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : []
			type m={
				id:number
			}
			const localST:Array<m>=mi_array.map((l:number)=>({id:l}))

			const orderObj = localST.reduce( (a:any,c:any,i:any) => { a[c.id] = i; return a; } , {});
			const mv=nowArray
			mv.sort( (l:any,r:any) =>  orderObj[l.id] - orderObj[r.id] );
			setnowArray(mv)
	},[ListofVacancies])

    return <>
    {nowArray.map((item,index)=>{
		debugger
						return <div key={nanoid()} className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(index)} >{item.profession}</p>
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






