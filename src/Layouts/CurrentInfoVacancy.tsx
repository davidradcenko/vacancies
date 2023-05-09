import { useParams } from 'react-router-dom'
import location from '../assets/Location.png'
import star from '../assets/Star.png'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { VacancyDataType } from '../Reducer/initialazedReducer'



export const CurrentInfoVacancy=React.memo(()=> {
	const params = useParams<'id'>()
	const ListofVacancies = useSelector<RootState, Array<VacancyDataType>>(state => state.initialazed.currentVacancies)

	const myInfo=ListofVacancies.filter((index)=>index.id==Number(params.id))
debugger
	console.log("__________________"+params.id)
return (
<>
	<div className='Main-Info-Vacancy'>
		<div className='Main-Info-Container'>
			<div className='Main-Info-Name-and-Stars'>
				<p>{myInfo[0].profession}</p>
				<img src={star} alt='star' />
			</div>

			<div className='Main-Info-Salary-and-TypeWork'>
				<p className='Main-Info-In-Salary'>з/п от {myInfo[0].payment_from} {myInfo[0].currency}</p>
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
			{myInfo[0].MoreInfo}
		</div>
	</div>
</>
)
})