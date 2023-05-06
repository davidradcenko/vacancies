import { Button, Input, Tooltip } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
export default function InputSearch() {
	return (
		<Input
			icon={<IconSearch size='1rem' />}
			sx={{ maxWidth: '100%' }}
			placeholder='Your twitter'
			rightSection={
				<Tooltip label='This is public' position='top-end' withArrow>
					<div className='SearchButton'>
						<Button sx={{ marginRight: 12 }}>Settings</Button>
					</div>
				</Tooltip>
			}
		/>
	)
}
