import { Select } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

export default function InputSelectBranch() {
	return (
		<>
			<div className='OTR'>
				<Select
					label='Отрасль'
					placeholder='Отрасль'
					dropdownPosition='bottom'
					rightSection={<IconChevronDown />}
					rightSectionWidth={30}
					styles={{ rightSection: { pointerEvents: 'none' } }}
					data={['React', 'Angular', 'Svelte', 'Vue']}
				/>
			</div>
		</>
	)
}
