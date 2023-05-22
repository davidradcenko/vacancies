import { useLocation, useNavigate, useParams  } from 'react-router-dom'

import locationImg from '../img/Location.png'

import { VacancyDataType } from '../Reducer/initialazedReducer'
import { StarForMainSaveVacancy, StarForSaveVacancy } from '../UI-Components/StarsForSaveVacancy'


/* ------- INTRODUCTION ------- */
/*
In this component, I have taken out the full page of the vacancy.
By clicking on a vacancy, the user goes to the page of this vacancy where he can get acquainted with this vacancy in more detail
*/

export const CurrentInfoVacancy=()=> {

	// I take the necessary data from the url where this vacancy is stored after the transition
	const navigate= useNavigate()
	let vacancy:VacancyDataType={id:1,profession:"",payment_from:1,currency:'rub' ,type_of_work:"string",town:"string",MoreInfo:"string",payment_to:1}
	const {abject} =  useParams<"abject">()

	//form ?
	const location = useLocation()
	const {state}=location

	const fromURL= state?.from 

	// In the case of an empty object taken from the url, a redirect occurs back
	if (!abject){
		navigate(-1)
	}else{
		vacancy= JSON.parse(abject)
	}
	
	// Checking whether this vacancy is saved
	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
	
return (
<>	
	{typeof vacancy!=='string'
	?<>
		<div className='Main-Info-Vacancy'>
			<div className='Main-Info-Container'>
				<div className='Main-Info-Name-and-Stars'>
					<p>{vacancy.profession}</p>
					{
						fromURL=='main'
						?<StarForMainSaveVacancy dataIlement={String(vacancy.id)}  id={vacancy.id} active={mi_array.includes(vacancy.id)?true:false}/>
						:<StarForSaveVacancy dataIlement={String(vacancy.id)}  id={vacancy.id} active={mi_array.includes(vacancy.id)?true:false}/>
					}
					
				</div>

				<div className='Main-Info-Salary-and-TypeWork'>
					{vacancy.payment_from==0
						?vacancy.payment_to==0?<p className='In-Salary'>з/п Не указано</p>:<p className='In-Salary'>з/п до {vacancy.payment_to}</p>
						:<p className='Main-Info-In-Salary'>з/п от {vacancy.payment_from} {vacancy.currency}</p>}

						<p className='Main-Info-In-Dart'>•</p>
						<p className='Main-Info-In-Type'>{vacancy.type_of_work}</p>
				</div>

				<div className='Main-Info-location'>
					<img src={locationImg} alt='location' />
					<p>{vacancy.town}</p>
				</div>
			</div>
		</div>

		<div className='current-Info-Vacancy'>
			<div className='current-Info-container'>
			<div dangerouslySetInnerHTML={{__html:vacancy.MoreInfo}} />
			</div>
		</div>
	</>
	: <div></div>
	}
</>
)}