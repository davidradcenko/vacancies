import { Pagination } from '@mantine/core'
import  { memo } from 'react'
import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { deleteStateSavedVacanciesAC, setCurrentPageSavedVacancies, setPage } from '../Reducer/initialazedReducer'



/* ------- INTRODUCTION ------- */
/*
	This component is responsible paginator logic for main page
*/
export const Paginator=memo(()=> {
	const dispatch = useAppDispatch()

	const totalPage = useSelector<RootState, number>(state => state.initialazed.totalPage)
	const currentPage = useSelector<RootState, number>(state => state.initialazed.curentPageVacancies)

	const changeActivePage=(page:number)=>{
		dispatch(setPage(page-1))
	}

	return (
		<>
			<div className='paginator'>
				<Pagination value={currentPage+1} onChange={(e)=>changeActivePage(e)} total={Math.ceil((totalPage)/4)>125?125:Math.ceil((totalPage)/4)} />
			</div>
		</>
	)
})



/* ------- INTRODUCTION ------- */
/*
	This component is responsible paginator logic for saved vacancy page
*/
export const PaginatorForSaveVacancies=memo((props:PaginatorForSaveVacanciesType)=> {
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

// types 
type PaginatorForSaveVacanciesType={
	total:number,
	currentPage:number
}