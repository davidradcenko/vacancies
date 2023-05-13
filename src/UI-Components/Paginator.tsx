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
type PaginatorForSaveVacanciesType={
	total:number,
	currentPage:number
}






export const PaginatorForSaveVacancies=React.memo((props:PaginatorForSaveVacanciesType)=> {
	const dispatch = useAppDispatch()
	const changeActivePage=(page:number)=>{
		dispatch(deleteStateSavedVacanciesAC())
		dispatch(setCurrentPageSavedVacancies(page))
	}

	return (
		<>
			<div className='paginator'>
				<Pagination value={props.currentPage} onChange={(e)=>changeActivePage(e)} total={Math.ceil(props.total/4)} />
			</div>
		</>
	)
})
