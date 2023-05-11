import { Pagination } from '@mantine/core'
import React, { useState } from 'react'
import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { deleteStateSavedVacanciesAC, setCurrentPageSavedVacancies, setPage } from '../Reducer/initialazedReducer'

export const Paginator=React.memo(()=> {
	const dispatch = useAppDispatch()
	const totalPage = useSelector<RootState, number>(state => state.initialazed.totalPage)
	const currentPage = useSelector<RootState, number>(state => state.initialazed.curentPageVacancies)


	const [activePage, setActivePage] = useState<number>(currentPage)
	
	const changeActivePage=(page:number)=>{
		setActivePage(page)
		dispatch(setPage(page))
	}

	return (
		<>
			<div className='paginator'>
				<Pagination value={activePage==0?1:activePage} onChange={(e)=>changeActivePage(e)} total={totalPage==0?1:totalPage} />
			</div>
		</>
	)
})

export const PaginatorForSaveVacancies=React.memo(()=> {
	const dispatch = useAppDispatch()
	const currentPage = useSelector<RootState, number>(state => state.initialazed.savedVacancies.currentPage)
	let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : [];


	const [activePage, setActivePage] = useState<number>(currentPage)
	
	const changeActivePage=(page:number)=>{
		debugger
		dispatch(deleteStateSavedVacanciesAC())
		setActivePage(page)
		dispatch(setCurrentPageSavedVacancies(page))
		
	}

	return (
		<>
			<div className='paginator'>
				<Pagination value={activePage==0?1:activePage} onChange={(e)=>changeActivePage(e)} total={Math.ceil(mi_array.length/4)} />
			</div>
		</>
	)
})
