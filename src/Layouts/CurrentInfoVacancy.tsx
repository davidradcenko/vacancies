import { useNavigate, useParams } from 'react-router-dom'
import location from '../assets/Location.png'
import { VacancyDataType } from '../Reducer/initialazedReducer'
import { StarForSaveVacancy } from '../UI-Components/StarsForSaveVacancy'



export const CurrentInfoVacancy=()=> {
	const navigate= useNavigate()
	let vacancy:VacancyDataType={id:1,profession:"",payment_from:1,currency:'rub' ,type_of_work:"string",town:"string",MoreInfo:"string",payment_to:1}

	
	const {abject} =  useParams<"abject">()

	

	if (!abject){
		navigate(-1)
	}else{
		vacancy= JSON.parse(abject)
	}
	
	
	
	

	
	
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
				<StarForSaveVacancy id={vacancy.id} active={mi_array.includes(vacancy.id)?true:false}/>
			</div>

			<div className='Main-Info-Salary-and-TypeWork'>
			{vacancy.payment_from==0
				?vacancy.payment_to==0?<p className='In-Salary'>з/п Не указано</p>:<p className='In-Salary'>з/п до {vacancy.payment_to}</p>
				:<p className='Main-Info-In-Salary'>з/п от {vacancy.payment_from} {vacancy.currency}</p>}

				<p className='Main-Info-In-Dart'>•</p>
				<p className='Main-Info-In-Type'>{vacancy.type_of_work}</p>
			</div>

			<div className='Main-Info-location'>
				<img src={location} alt='location' />
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