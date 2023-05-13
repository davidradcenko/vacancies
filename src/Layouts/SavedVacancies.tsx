import { useEffect } from 'react'
import { Paginator, PaginatorForSaveVacancies } from '../UI-Components/Paginator'
import { SavedTableVacancies } from '../UI-Components/VacancyTable'
import location from '../assets/Location.png'
import starSelect from '../assets/StarSelect.png'
import { RootState, useAppDispatch } from '../store/store'
import { setArrayIdAC } from '../Reducer/initialazedReducer'

import NoSavedVacancies from './NoSavedVacancies'
import { useSelector } from 'react-redux'

// import NoSavedVacancies from './NoSavedVacancies'
export default function SavedVacancies() {
	const dispatch = useAppDispatch()
	const arrayIdFormRedux = useSelector<RootState, Array<string>>(state => state.initialazed.savedVacancies.arrayId)
	let mi_array:any=[]
	
    
	useEffect(()=>{
		debugger
		const currentData  = localStorage.getItem("Id_Vacancies")
		mi_array = currentData ? JSON.parse(currentData) : [];
		dispatch(setArrayIdAC(mi_array))
	},[])
	
	return (
		<>
		{arrayIdFormRedux.length==0 
		?<NoSavedVacancies />
		:<div className='SavedVacancies'>
			<SavedTableVacancies arrayId={mi_array}/>
		</div> 
		}	
		</>
	)
}
