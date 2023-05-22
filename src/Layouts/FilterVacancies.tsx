import { Box, Button, Flex, NumberInput, Select } from '@mantine/core'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useEffect,useState }  from 'react'

import { RootState, useAppDispatch } from '../store/store'
import { BranchsType, getPublishVacanciesTC, setFilterAC } from '../Reducer/initialazedReducer'
import vectorSelect  from '../img/VectorSelect.svg'
import VectorSelectDone  from '../img/VectorSelectDone.svg'
import Filternone  from '../img/filter-none.svg'


/* ------- INTRODUCTION ------- */
/*
	The component in which the filter is implemented
*/
export default function FilterVacancies() {
	const dispatch = useAppDispatch()

	// filter dates
	const Branches = useSelector<RootState, Array<BranchsType>>(state => state.initialazed.branchs)
	const selectBranch = useSelector<RootState, number>(state => state.initialazed.filter.selectBranch)
	const payment_from = useSelector<RootState, number>(state => state.initialazed.filter.startPrice)
	const payment_to = useSelector<RootState, number>(state => state.initialazed.filter.endPrice)

	// search value
	const searchValue = useSelector<RootState, string>(state => state.initialazed.filter.inputSearchValue)

	// State for control position select input
	const [valueSelectInput, setValueSelectInput] = useState<boolean>(false)

	const handleSelectInput=()=>{
		setValueSelectInput(!valueSelectInput)
	}
	const handleSelectInput1=()=>{
		setValueSelectInput(false)
	}

	// set in formik SelectBranch  
	const ChangeC = (name: string | null ) => {
		setValueSelectInput(false)
		formik.setValues({SelectBranch:name?name:"",endPrice:formik.values.endPrice,startPrice:formik.values.startPrice})
	}

	// Clear filter values
	const ClearAllValues=()=>{
		dispatch(setFilterAC(0,0,0,searchValue))
		formik.setValues({SelectBranch:"",endPrice:0,startPrice:0})
	}


    const formik = useFormik({

        validate: () => {
            const errors: FormikErrorType = {};
            // no validate
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
							data-elem='industry-select'
							nothingFound='No options'
							rightSection={<img src={valueSelectInput?VectorSelectDone:vectorSelect}/>}
							transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
							value={formik.values.SelectBranch}
							onChange={(e:any)=>ChangeC(e)}
							data={Branches}
							onDropdownOpen={handleSelectInput}
							onDropdownClose={handleSelectInput1}
							placeholder="Выберите отрасль"
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
							data-elem='salary-from-input'
							sx={{ marginBottom: 10,borderRadius:'8px',".mantine-x0i9fi,.mantine-1g3thxc":{border:'none',color:"#ACADB9"} }}
							step={1000}
							min={0}
							defaultValue={0}
							onChange={(e:any)=>formik.setValues({SelectBranch:formik.values.SelectBranch,endPrice:formik.values.endPrice,startPrice:e?e:0})}
							value={formik.values.startPrice==0?'':formik.values.startPrice}
						/>
						<NumberInput
							placeholder={'До'}
							data-elem='salary-to-input'
							stepHoldDelay={500}
							step={1000}
							inputMode='numeric'
							pattern='[0-9]*'
							min={0}
							stepHoldInterval={(t:any) => Math.max(1000 / t ** 2, 25)}
							sx={{ marginBottom: 20,borderRadius:'8px',".mantine-x0i9fi,.mantine-1g3thxc":{border:'none',color:"#ACADB9"} }}
							onChange={(e:any)=>formik.setValues({SelectBranch:formik.values.SelectBranch,endPrice:e?e:0,startPrice:formik.values.startPrice})}
							value={formik.values.endPrice==0?'':formik.values.endPrice}
						/>
						<p>{formik.errors.startPrice}</p>
					</div>

					<Flex gap='md'>
						<Box w={250}>
							<Button data-elem='search-button' type="submit" fullWidth>Применить</Button>
						</Box>
					</Flex>
				
			</form>
			</div>
		</div>
	)
}

// types 
type FormikErrorType = {
	startPrice?: string
}