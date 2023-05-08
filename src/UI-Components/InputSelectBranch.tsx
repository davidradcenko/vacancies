import { Select } from '@mantine/core'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BranchsType } from '../Reducer/initialazedReducer'
import { RootState } from '../store/store'

export default function InputSelectBranch() {
	const Branches = useSelector<RootState, Array<BranchsType>>(
		state => state.initialazed.branchs
	)
	const [value, setValue] = useState<string | null>(null)

	const ChangeC = (name: string | null) => {
		setValue(name)
	}
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
