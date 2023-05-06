import { Box, Button, Flex } from '@mantine/core'
import CloseIcon from '@mui/icons-material/Close'
import InputSelectBranch from '../UI-Components/InputSelectBranch'
import SalaryScale from '../UI-Components/SalaryScale'

export default function FilterVacancies(props: any) {
	return (
		<div className='filter'>
			<form action=''>
				<div className='filter-container'>
					<div className='Name-Filter'>
						<p>Фильтры</p>
						<p>
							Сбросить все <CloseIcon />
						</p>
					</div>

					<InputSelectBranch />

					<SalaryScale />

					<Flex gap='md'>
						<Box w={250}>
							<Button fullWidth>Применить</Button>
						</Box>
					</Flex>
				</div>
			</form>
		</div>
	)
}
