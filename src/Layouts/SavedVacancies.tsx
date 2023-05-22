import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { SavedTableVacancies } from '../UI-Components/VacancyTable'
import { RootState, useAppDispatch } from '../store/store'
import { setArrayIdAC } from '../Reducer/initialazedReducer'
import NoSavedVacancies from './NoSavedVacancies'

/* ------- INTRODUCTION ------- */
/*
	This component is responsible for the saved vacancies page with the url /saved
*/
export default function SavedVacancies() {
	const dispatch = useAppDispatch()

	const arrayIdFormRedux = useSelector<RootState, Array<string>>(state => state.initialazed.savedVacancies.arrayId)

	// Checking whether there are saved vacancies
	let mi_array:any=[]
	useEffect(()=>{
		const currentData  = localStorage.getItem("Id_Vacancies")
		mi_array = currentData ? JSON.parse(currentData) : [];
		dispatch(setArrayIdAC(mi_array))
	},[])
	
	return (
		<>
		{arrayIdFormRedux.length==0 
			?<NoSavedVacancies />
			:<div className='vacansiesContainer'>
				<div className='vacansies-container'>
					<SavedTableVacancies />
				</div>
			</div> 
		}	
		</>
	)
}
