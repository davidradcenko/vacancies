import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import { nanoid } from 'nanoid'
import { Skeleton } from "@mantine/core"

import { RootState, useAppDispatch } from "../store/store"
import { VacancyDataType, deleteStateSavedVacanciesAC, getCurrentsVacanciesTC, setArrayIdAC, statusType } from "../Reducer/initialazedReducer"
import location from '../assets/Location.png'
import { StarForSaveVacancy } from "./StarsForSaveVacancy"
import { PaginatorForSaveVacancies } from "./Paginator"


/* ------- INTRODUCTION ------- */
/*
	This component is responsible table vacancies for main page
*/
export const VacancyTable= React.memo(()=>{

    const ListofVacancies = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.currentVacancies)
    const progress = useSelector<RootState, statusType>(state => state.initialazed.status)

	// navigate fot more info about vacancy
	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		const v=JSON.stringify(ListofVacancies[id])
		navigate(`/Info/${encodeURIComponent(v)}`)  
	}

	//get array saved vacancy 
	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];

    return <>
 {ListofVacancies.map((item,index)=>{
							return <div key={item.id} className='Main-margin'>
						{progress=='succeeded'
							?
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(index)} >{item.profession}</p>
									<StarForSaveVacancy id={item.id} active={mi_array.includes(item.id)?true:false}/>
								</div>

								<div className='Salary-and-TypeWork'>
									{item.payment_from==0
									?item.payment_to==0?<p className='In-Salary'>з/п Не указано</p>:<p className='In-Salary'>з/п до {item.payment_to}</p>
									:<p className='In-Salary'>з/п от {item.payment_from} {item.currency}</p>}
									
									<p className='In-Dart'>•</p>
									<p className='In-Type'>{item.type_of_work}</p>
								</div>

								<div className='location'>
									<img src={location} alt='location' />
									<p>{item.town}</p>
								</div>
							</div>
							:
							<div className='Info-Vacancy'>
								<div className="skaleton">
									<Skeleton height={8}   width="70%" mb="xl" />
									<Skeleton height={15} circle width="20px" mb="xl" />
								</div>
							<Skeleton height={8}  width="30%" mb="md" />
	<Skeleton height={8}  width="15%" mb="md" />
								
							</div>
							}

						</div>
						})}
    </>
})

/* ------- INTRODUCTION ------- */
/*
	This component is responsible table vacancies for saved page
*/
export const SavedTableVacancies= React.memo((props:{arrayId:Array<string>})=>{
	const dispatch = useAppDispatch()

	const arrayIdFormRedux = useSelector<RootState, Array<string>>(state => state.initialazed.savedVacancies.arrayId)
	const currentPage = useSelector<RootState, number>(state => state.initialazed.savedVacancies.currentPage)
	const Vacancy = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.savedVacancies.vacancies)
	const progress = useSelector<RootState, statusType>(state => state.initialazed.status)

	// states
	const [nowArray,setnowArray]=useState<Array<VacancyDataType>>([])
	let mi_array:Array<string>=[]

	// navigation
	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		const v=JSON.stringify(Vacancy[id])
		navigate(`/Info/${encodeURIComponent(v)}`)  
	}

	
	// if page change
	useEffect(()=>{
		const currentData  = localStorage.getItem("Id_Vacancies")
		mi_array = currentData ? JSON.parse(currentData) : [];
		
		dispatch(deleteStateSavedVacanciesAC())

		let iteral=0
		let start=(currentPage*4)-4
		if(currentPage==1){
			start=0
		}
		for(let i=start;i<=mi_array.length-1;i++){
			if(iteral==4){
				break
			}
			iteral=iteral+1
			dispatch(getCurrentsVacanciesTC(Number(mi_array[i])))
		}
		dispatch(setArrayIdAC(mi_array))
	},[currentPage])


	// if list whis vacancy changed
	useEffect(()=>{
		const w=Vacancy
		let mi_array:any=[]
		const currentData  = localStorage.getItem("Id_Vacancies")
		mi_array = currentData ? JSON.parse(currentData) : []
		const localST:Array<{id:number}>=mi_array.map((l:number)=>({id:l}))
	
		const orderObj = localST.reduce( (a:any,c:any,i:any) => { a[c.id] = i; return a; } , {});
		
		w.sort( (l:any,r:any) =>  orderObj[l.id] - orderObj[r.id] );
		setnowArray(w)
	},[Vacancy])


	//when side oll time 
	useEffect(()=>{
		const currentData  = localStorage.getItem("Id_Vacancies")
		mi_array = currentData ? JSON.parse(currentData) : [];
	},[])

	// convert array int to string
	const numberArray: number[] = arrayIdFormRedux.map((element: string) => parseFloat(element));

    return <>
    {nowArray.map((item,index)=>{
						return <div key={nanoid()} className='Main-margin'>
							{progress=='succeeded'?
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(index)} >{item.profession}</p>
									<StarForSaveVacancy id={item.id} active={numberArray.includes((item.id))?true:false}/>
								</div>

								<div className='Salary-and-TypeWork'>
									{item.payment_from==0
									?item.payment_to==0?<p className='In-Salary'>з/п Не указано</p>:<p className='In-Salary'>з/п до {item.payment_to}</p>
									:<p className='In-Salary'>з/п от {item.payment_from} {item.currency}</p>}
									
									<p className='In-Dart'>•</p>
									<p className='In-Type'>{item.type_of_work}</p>
								</div>

								<div className='location'>
									<img src={location} alt='location' />
									<p>{item.town}</p>
								</div>
							</div>
							:
							<div className='Info-Vacancy'>
								<div className="skaleton">
									<Skeleton height={8}   width="70%" mb="xl" />
									<Skeleton height={15} circle width="20px" mb="xl" />
								</div>
							<Skeleton height={8}  width="30%" mb="md" />
    <Skeleton height={8}  width="15%" mb="md" />	
							</div>
							}
						</div>
						})}

		<PaginatorForSaveVacancies total={arrayIdFormRedux.length} currentPage={currentPage}/>
    </>
})






