import { Box, Button, Flex, NumberInput, Select } from '@mantine/core'
import CloseIcon from '@mui/icons-material/Close'
import InputSelectBranch from '../UI-Components/InputSelectBranch'
import SalaryScale from '../UI-Components/SalaryScale'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store'
import { BranchsType, getPublishVacanciesTC, setFilterAC } from '../Reducer/initialazedReducer'
import React, { useEffect }  from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import vectorSelect  from '../assets/VectorSelect.svg'
import VectorSelectDone  from '../assets/VectorSelectDone.svg'
import Filternone  from '../assets/filter-none.svg'

export default function FilterVacancies(props: any) {
	const dispatch = useAppDispatch()

	const page = useSelector<RootState, number>(state => state.initialazed.curentPageVacancies)
	const Branches = useSelector<RootState, Array<BranchsType>>(state => state.initialazed.branchs)

	const selectBranch = useSelector<RootState, number>(state => state.initialazed.filter.selectBranch)
	const payment_from = useSelector<RootState, number>(state => state.initialazed.filter.startPrice)
	const payment_to = useSelector<RootState, number>(state => state.initialazed.filter.endPrice)
	const searchValue = useSelector<RootState, string>(state => state.initialazed.filter.inputSearchValue)
	const [value, setValue] = React.useState<string | null>(null)
	const [valueSelectInput, setValueSelectInput] = React.useState<boolean>(false)

	const handleSelectInput=()=>{
		setValueSelectInput(!valueSelectInput)
	}
	const handleSelectInput1=()=>{
		setValueSelectInput(false)
	}

	const ChangeC = (name: string | null ) => {
		setValue(name)
		setValueSelectInput(false)
		formik.setValues({SelectBranch:name?name:"",endPrice:formik.values.endPrice,startPrice:formik.values.startPrice})
	}

	const ClearAllValues=()=>{
		dispatch(setFilterAC(0,0,0,searchValue))
		formik.setValues({SelectBranch:"",endPrice:0,startPrice:0})
	}

	type FormikErrorType = {
        startPrice?: string
    }
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            // if (values.startPrice>values.endPrice) {
            //     errors.startPrice = 'Required';
            // } 
            return errors;
        },
        initialValues: {
            SelectBranch: '',
            startPrice: 0,
            endPrice: 0
        },
        onSubmit: values => {
			dispatch(setFilterAC(Number(values.SelectBranch),values.startPrice,values.endPrice,searchValue))
            dispatch(getPublishVacanciesTC(0,Number(values.SelectBranch),values.startPrice,values.endPrice,searchValue))
        },
    })
	useEffect(()=>{
		formik.setValues({SelectBranch:String(selectBranch),endPrice:payment_to,startPrice:payment_from})
	},[])
	return (
		<div className='filter'>
			<div className='filter-container'>
			<form onSubmit={formik.handleSubmit}>
				
					<div className='Name-Filter'>
						<p className='Name-Filter-fiter'>Фильтры</p>
						
							<Button sx={{width:'115px',height:'20px', margin:'0px',padding:'0px'}}  onClick={ClearAllValues} variant="subtle">
								<div className='filter-div'>
								<p className='filter-none'>Сбросить все</p>
								<img className='filter-img-none' src={Filternone} alt="Filternone" />
								</div>
							</Button>
						
					</div>

					<div className='OTR'>
						<Select
							label='Отрасль'
							nothingFound='No options'
							rightSection={<img src={valueSelectInput?VectorSelectDone:vectorSelect}/>}
							transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
							value={formik.values.SelectBranch}
							onChange={(e)=>ChangeC(e)}
							data={Branches}
							onDropdownOpen={handleSelectInput}
							onDropdownClose={handleSelectInput1}
							placeholder="Выберите отрасль"
							data-elem="industry-select"
							sx={{borderRadius:'8px'}}
							styles={{
								item: {
								'&[data-selected]':{ backgroundColor:'#5E96FC'},
								'&[data-hovered]': {backgroundColor:'#DEECFF'},
								},
								rightSection: { pointerEvents: 'none'}
							}}
						/>
					</div>

					<div className='Ocl'>
						<NumberInput
							label='Оклад'
							placeholder={'От'}
							stepHoldDelay={500}
							inputMode='numeric'
							pattern='[0-9]*'
							stepHoldInterval={100}
							
							sx={{ marginBottom: 10,borderRadius:'8px',".mantine-x0i9fi,.mantine-1g3thxc":{border:'none',color:"#ACADB9"} }}
							step={1000}
							min={0}
							defaultValue={0}
							onChange={(e)=>formik.setValues({SelectBranch:formik.values.SelectBranch,endPrice:formik.values.endPrice,startPrice:e?e:0})}
							value={formik.values.startPrice==0?'':formik.values.startPrice}
						/>
						<NumberInput
							placeholder={'До'}
							stepHoldDelay={500}
							step={1000}
							inputMode='numeric'
							pattern='[0-9]*'
							min={0}
							stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
							sx={{ marginBottom: 20,borderRadius:'8px',".mantine-x0i9fi,.mantine-1g3thxc":{border:'none',color:"#ACADB9"} }}
							onChange={(e)=>formik.setValues({SelectBranch:formik.values.SelectBranch,endPrice:e?e:0,startPrice:formik.values.startPrice})}
							value={formik.values.endPrice==0?'':formik.values.endPrice}
						/>
						<p>{formik.errors.startPrice}</p>
					</div>

					<Flex gap='md'>
						<Box w={250}>
							<Button type="submit" fullWidth>Применить</Button>
						</Box>
					</Flex>
				
			</form>
			</div>
		</div>
	)
}
