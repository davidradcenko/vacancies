import React, { useEffect } from 'react'
import FilterVacancies from '../Layouts/FilterVacancies'
import InputSearch from '../UI-Components/InputSearch'


import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { VacancyDataType, getPublishVacanciesTC } from '../Reducer/initialazedReducer'
import { VacancyTable } from '../UI-Components/VacancyTable'
import { Paginator } from '../UI-Components/Paginator'
import { Alert, AlertTitle } from '@mui/material'

const  MainPage=React.memo(()=> {
	const dispatch = useAppDispatch()
	const Branches = useSelector<RootState, string | null>(state => state.initialazed.datasReqAuth.access_token)
	const page = useSelector<RootState, number>(state => state.initialazed.curentPageVacancies)
	const selectBranch = useSelector<RootState, number>(state => state.initialazed.filter.selectBranch)
	const payment_from = useSelector<RootState, number>(state => state.initialazed.filter.startPrice)
	const payment_to = useSelector<RootState, number>(state => state.initialazed.filter.endPrice)
	const searchValue = useSelector<RootState, string>(state => state.initialazed.filter.inputSearchValue)
	const error = useSelector<RootState, string | null>(state => state.initialazed.error)
	
	useEffect(() => {
		if(Branches){
			dispatch(getPublishVacanciesTC(page,selectBranch,payment_from,payment_to,searchValue))
		}
		
	},[Branches,page])
	return (
		<>
			<div className='main'>
				<FilterVacancies />
				<div className='vacancies'>
					<InputSearch />

					<div className='ResultSearch'>
					{error?
				<Alert severity="error">{error}</Alert>
				:<VacancyTable/>}
						
						
						<div className='MainPaginator'>
							<Paginator />
						</div>
					</div>
				</div>
			</div>
		</>
	)
})
export default  MainPage