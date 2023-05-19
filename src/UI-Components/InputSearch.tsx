import { Button, Input, Tooltip } from '@mantine/core'
import React, { useEffect } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getPublishVacanciesTC, setFilterAC } from '../Reducer/initialazedReducer'
import { useState } from 'react'
export default function InputSearch() {
	const dispatch = useAppDispatch()
	const selectBranch = useSelector<RootState, number>(state => state.initialazed.filter.selectBranch)
	const payment_from = useSelector<RootState, number>(state => state.initialazed.filter.startPrice)
	const payment_to = useSelector<RootState, number>(state => state.initialazed.filter.endPrice)
	const searchValue = useSelector<RootState, string>(state => state.initialazed.filter.inputSearchValue)

	const [value,setValue]=useState<string>("")
	const handleChange=(value:string)=>{
		setValue(value)
		dispatch(setFilterAC(0,0,0,value))
	}

	const SearchVacancy=()=>{
		dispatch(getPublishVacanciesTC(0,selectBranch,payment_from,payment_to,value))
	}
	useEffect(()=>{
		setValue(searchValue)
	},[])
	return (
		<Input
			icon={<IconSearch size='1rem' />}
			sx={{ maxWidth: '100%',height:'48px' }}
			placeholder='Введите название вакансии'
			value={value}
			onChange={(e)=>handleChange(e.target.value)}
			rightSection={
				
					<div className='SearchButton'>
						<Button onClick={SearchVacancy} sx={{ marginRight: 12 }}>Поиск</Button>
					</div>
				
			}
		/>
	)
}
