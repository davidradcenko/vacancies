import { Button, Input, Tooltip } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getPublishVacanciesTC } from '../Reducer/initialazedReducer'
import { useState } from 'react'
export default function InputSearch() {
	const dispatch = useAppDispatch()
	const selectBranch = useSelector<RootState, number>(state => state.initialazed.filter.selectBranch)
	const payment_from = useSelector<RootState, number>(state => state.initialazed.filter.startPrice)
	const payment_to = useSelector<RootState, number>(state => state.initialazed.filter.endPrice)

	const [value,setValue]=useState<string>("")
	const handleChange=(value:string)=>{
		setValue(value)
	}

	const SearchVacancy=()=>{
		debugger
		dispatch(getPublishVacanciesTC(1,selectBranch,payment_from,payment_to,value))
	}
	return (
		<Input
			icon={<IconSearch size='1rem' />}
			sx={{ maxWidth: '100%' }}
			placeholder='Your twitter'
			value={value}
			onChange={(e)=>setValue(e.target.value)}
			rightSection={
				<Tooltip label='This is public' position='top-end' withArrow>
					<div className='SearchButton'>
						<Button onClick={SearchVacancy} sx={{ marginRight: 12 }}>Settings</Button>
					</div>
				</Tooltip>
			}
		/>
	)
}
