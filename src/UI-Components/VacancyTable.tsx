import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { VacancyDataType } from "../Reducer/initialazedReducer"
import location from '../assets/Location.png'
import React from "react"
import {Link, Navigate, useNavigate} from "react-router-dom";
import { StarForSaveVacancy } from "./StarsForSaveVacancy"

export const VacancyTable= React.memo(()=>{
    const ListofVacancies = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.currentVacancies)

	const navigate = useNavigate();
	const Redirect=(id:number)=>{
		navigate(`/Info/${id}`)  
	}
    return <>
    {ListofVacancies.map((item)=>{
							return <div key={item.id} className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p onClick={()=>Redirect(item.id)} >{item.profession}</p>
									<StarForSaveVacancy/>
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