import { Pagination } from '@mantine/core'
import React, { useState } from 'react'
import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { setPage } from '../Reducer/initialazedReducer'

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
