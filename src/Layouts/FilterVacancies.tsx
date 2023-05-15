import { Box, Button, Flex, NumberInput, Select } from '@mantine/core'
import CloseIcon from '@mui/icons-material/Close'
import InputSelectBranch from '../UI-Components/InputSelectBranch'
import SalaryScale from '../UI-Components/SalaryScale'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { BranchsType } from '../Reducer/initialazedReducer'
import React  from 'react'

export default function FilterVacancies(props: any) {


	const Branches = useSelector<RootState, Array<BranchsType>>(state => state.initialazed.branchs)
	const [value, setValue] = React.useState<string | null>(null)

	const ChangeC = (name: string | null ) => {
		setValue(name)
		formik.setValues({SelectBranch:name?name:"",endPrice:formik.values.endPrice,startPrice:formik.values.startPrice})
	}


	type FormikErrorType = {
        startPrice?: string
    }
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.startPrice>values.endPrice) {
                errors.startPrice = 'Required';
            } 
            return errors;
        },
        initialValues: {
            SelectBranch: '',
            startPrice: 0,
            endPrice: 0
        },
        onSubmit: values => {
			debugger
            // dispatch(loginIn(values))
        },
    })
	// useEffect(() => {
    //     formik.setValues({
    //         SelectBranch: Branches,
	// 		endPrice:'1',
	// 		startPrice:'1'
    //     })
    // }, [Branches])

	return (
		<div className='filter'>

			<form onSubmit={formik.handleSubmit}>
				<div className='filter-container'>
					<div className='Name-Filter'>
						<p>Фильтры</p>
						<p>
							Сбросить все <CloseIcon />
						</p>
					</div>

					<div className='OTR'>
						<Select
							// data={{...formik.getFieldProps("SelectBranch")}}
							searchable
							nothingFound='No options'
							// value={value}
							value={formik.values.SelectBranch}
							onChange={(e)=>ChangeC(e)}
							data={Branches}
						/>
					</div>

					<div className='Ocl'>
						<NumberInput
							label='Оклад'
							placeholder={'От'}
							stepHoldDelay={500}
							stepHoldInterval={100}
							sx={{ marginBottom: 10 }}
							step={50}
							min={0}
							onChange={(e)=>formik.setValues({SelectBranch:formik.values.SelectBranch,endPrice:formik.values.endPrice,startPrice:e?e:0})}
							value={formik.values.startPrice}
						/>
						<NumberInput
							placeholder={'До'}
							stepHoldDelay={500}
							step={50}
							min={0}
							stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
							sx={{ marginBottom: 20 }}
							onChange={(e)=>formik.setValues({SelectBranch:formik.values.SelectBranch,endPrice:e?e:0,startPrice:formik.values.startPrice})}
							value={formik.values.endPrice}
						/>
						<p>{formik.errors.startPrice}</p>
					</div>

					<Flex gap='md'>
						<Box w={250}>
							<Button type="submit" fullWidth>Применить</Button>
						</Box>
					</Flex>
				</div>
			</form>
			
		</div>
	)
}
