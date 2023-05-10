import { SavedTableVacancies } from '../UI-Components/VacancyTable'
import location from '../assets/Location.png'
import starSelect from '../assets/StarSelect.png'

import NoSavedVacancies from './NoSavedVacancies'

// import NoSavedVacancies from './NoSavedVacancies'
export default function SavedVacancies() {


	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];
	return (
		<>
		{mi_array.length==0
		?<NoSavedVacancies />
		:<div className='SavedVacancies'>
			<SavedTableVacancies/>
			{/* <Paginator /> */}
		</div> 
		}	
		</>
	)
}
