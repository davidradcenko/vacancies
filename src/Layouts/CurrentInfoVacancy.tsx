import { useNavigate, useParams } from 'react-router-dom'
import location from '../assets/Location.png'
import star from '../assets/Star.png'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { VacancyDataType } from '../Reducer/initialazedReducer'
import { StarForSaveVacancy } from '../UI-Components/StarsForSaveVacancy'



export const CurrentInfoVacancy=()=> {
	const params = useParams<'id'>()
	const from:any = useParams<'from'>()
	debugger
	const navigate = useNavigate();
	let ListofVacancies
	const formMain = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.currentVacancies)
	const formSave = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.savedVacancies.vacancies)
	if (from=="main"){
		ListofVacancies=formMain
	}else ListofVacancies=formSave 
	
	if (ListofVacancies.length==0) {
        navigate('/Saved')
    }
	const myInfo=ListofVacancies.filter((index)=>index.id==Number(params.id))

	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
	debugger
return (
<>	
	<div className='Main-Info-Vacancy'>
		<div className='Main-Info-Container'>
			<div className='Main-Info-Name-and-Stars'>
				<p>{myInfo[0].profession}</p>
				<StarForSaveVacancy id={myInfo[0].id} active={mi_array.includes(myInfo[0].id)?true:false}/>
			</div>

			<div className='Main-Info-Salary-and-TypeWork'>
			{myInfo[0].payment_from==0
				?<p className='Main-Info-In-Salary'>з/п Не указано</p>
				:<p className='Main-Info-In-Salary'>з/п от {myInfo[0].payment_from} {myInfo[0].currency}</p>}

				<p className='Main-Info-In-Dart'>•</p>
				<p className='Main-Info-In-Type'>{myInfo[0].type_of_work}</p>
			</div>

			<div className='Main-Info-location'>
				<img src={location} alt='location' />
				<p>{myInfo[0].town}</p>
			</div>
		</div>
	</div>

	<div className='current-Info-Vacancy'>
		<div className='current-Info-container'>
		<div dangerouslySetInnerHTML={{__html:myInfo[0].MoreInfo}} />
		</div>
	</div>
</>
)
}