import { NumberInput } from '@mantine/core'

export default function SalaryScale() {
	return (
		<>
			<div className='Ocl'>
				<NumberInput
					label='Оклад'
					placeholder={'От'}
					stepHoldDelay={500}
					stepHoldInterval={100}
					sx={{ marginBottom: 10 }}
					step={50}
					min={0}
				/>
				<NumberInput
					placeholder={'До'}
					stepHoldDelay={500}
					step={50}
					min={0}
					stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
					sx={{ marginBottom: 20 }}
				/>
			</div>
		</>
	)
}
