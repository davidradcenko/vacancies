import { Select } from '@mantine/core'
import { useEffect, useState } from 'react'
import React from "react";
import { useSelector } from 'react-redux'
import { BranchsType, getBranchsTC } from '../Reducer/initialazedReducer'
import { RootState, useAppDispatch } from '../store/store'

 const InputSelectBranch = React.memo(()=> {
	const dispatch = useAppDispatch()
	const Branches = useSelector<RootState, Array<BranchsType>>(
		state => state.initialazed.branchs
	)
	const [value, setValue] = useState<string | null>(null)

	const ChangeC = (name: string | null) => {
		setValue(name)
	}
	useEffect(() => {
		// dispatch(getBranchsTC())
	},[])

	return (
		<>
			<div className='OTR'>
				{/* <Select
					label='Отрасль'
					placeholder='Отрасль'
					dropdownPosition='bottom'
					rightSection={<IconChevronDown />}
					rightSectionWidth={30}
					styles={{ rightSection: { pointerEvents: 'none' } }}
					data={['React', 'Angular', 'Svelte', 'Vue']}
				/> */}
				<Select
					searchable
					nothingFound='No options'
					value={value}
					onChange={e => ChangeC(e)}
					data={Branches}
				/>
			</div>
		</>
	)
}
)

export default InputSelectBranch