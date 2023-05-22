import { Dispatch } from 'redux'
import { LoginApi, Request_token, setAuthForAXIOS } from '../api/VacanciesAPI'

/* ------- INTRODUCTION ------- */
/*
	This is the only Reducer that stores application data and work with queries
*/

const Initial: InitialazedType = {
	// error -- stores all the errors in case of malfunction of the request to the server
	error: null,
	// status -- stores the state in which the application is currently, if there is a request for data, the storage will be 'loading' 
	status: 'succeeded',
	// datasReqAuth -- stores dates after authorization 
	datasReqAuth: {
		access_token: null,
		expires_in: null,
		refresh_token: null,
		reg_user_resumes_count: null,
		token_type: null,
		ttl: null,
	},
	// currentVacancies -- stores received vacancies
	currentVacancies:[],
	// savedVacancies -- stores saved page vacancies 
	savedVacancies:{
		vacancies:[],
		// current page for paginator 
		currentPage:1,
		// array id`s received from local storage  
		arrayId:[]
	},
	// curentPageVacancies -- stores current page for paginator
	curentPageVacancies:0,
	// totalPage -- stores total vacancies
	totalPage:0,
	// branchs -- stores branchs
	branchs: [],
	// filter -- stores filter values 
	filter:{
		selectBranch:0,
		startPrice:0,
		endPrice:0,
		inputSearchValue:''
	}
}

export const initialazedReducer = (state: InitialazedType = Initial,action: actionTypes): InitialazedType => {
	switch (action.type) {
		case 'STATUS-USER': {
			return { ...state, status: action.value }
		}
		case 'ERROR-USER': {
			return { ...state, error: action.value }
		}
		case 'FROM-AUTH-REQUEST': {
			action.value.access_token !=null?localStorage.setItem('access_token',action.value.access_token) : ""
			return { ...state, datasReqAuth: { ...action.value } }
		}
		case 'SET-BRANCH': {
			return { ...state, branchs: action.value }
		}
		case 'SET-LIST-VACANCIES':{
			return {...state,currentVacancies:action.value,curentPageVacancies:action.page,totalPage:action.totalPage}
		}
		case 'SET-PAGE':{
			return {...state,curentPageVacancies:action.value}
		}
		case 'SET-LIST-VACANCIES-V2':{		
				return {...state,savedVacancies:
					{
				...state.savedVacancies,
				vacancies:[...state.savedVacancies.vacancies,...action.value]
					},
				}
		}
		case 'DELETE-SAVED-VACANCIES':{
			return {...state,savedVacancies:{
				currentPage:state.savedVacancies.currentPage,
				vacancies:[],
				arrayId:state.savedVacancies.arrayId,
			}}
		}
		case 'SET-CURRENT-PAGE-SAVED-VACANCIES':{
			return {...state,savedVacancies:{
				currentPage:action.currentPage,
				vacancies:state.savedVacancies.vacancies,
				arrayId:state.savedVacancies.arrayId,
			}}
		}
		case 'SET-ARRAY-ID':{
			let iteral=0
			const currentPage = state.savedVacancies.currentPage
			const mi_array=action.setArrayId

			let start=(currentPage*4)-4
			if(currentPage==1){
				start=0
			}
			for(let i=start;i<=mi_array.length-1;i++){
				if(iteral==4){
					break
				}
				iteral=iteral+1
				getCurrentsVacanciesTC(Number(mi_array[i]))
			}
			return{
				...state,
				savedVacancies:{
					...state.savedVacancies,
					arrayId:action.setArrayId
				}
			}
		}
		case 'SET-FILTER':{
			return{...state,filter:{
				selectBranch:action.selectBranch,
				startPrice:action.startPrice,
				endPrice:action.endPrice,
				inputSearchValue:action.inputSearchValue
			}}
		}
		default:
			return state
	}
}

// thunks

// authorization and take Branchs for filter
export const initializeAppTC = () => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		LoginApi.authMe()
			.then(res => {
				const datas: ResultAuthInterfase = res.data
				if(datas.access_token){
					const m=String( localStorage.setItem('access_token',datas.access_token))
					setAuthForAXIOS(m)
				}
				dispatch(statusUserAC('loading'))
				LoginApi.getBranchs()
					.then(rese => {
						const resData: Array<BranchsType> = rese.data.map((item: any) => ({
							value: String(item.key),
							label: item.title_rus,
						}))
						dispatch(setBranchsAC(resData))
						dispatch(errorUserAC(null))
						dispatch(statusUserAC('succeeded'))
					})
					.catch(error => {
						debugger
						// dispatch(errorUserAC(error.response.data.notification_type))
						dispatch(errorUserAC(error.message))
						dispatch(statusUserAC('succeeded'))
					})

				dispatch(authRequestAC(datas))
				dispatch(errorUserAC(null))
				dispatch(statusUserAC('succeeded'))
			})
			.catch(error => {
				dispatch(errorUserAC(error.message))
				dispatch(statusUserAC('succeeded'))
			})
	}
}

// get vacancies
export const getPublishVacanciesTC = (currentPage:number,catalogues=0,payment_from=0,payment_to=0,valueSearch="") => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		Request_token.getPublishVacancies(currentPage,catalogues,payment_from,payment_to,valueSearch)
			.then(res => {

				const resData: Array<VacancyDataType> = res.data.objects.map((item: any) => ({
					id:item.id,
					profession:item.profession,
					payment_from:item.payment_from,
					currency:item.currency, 
					type_of_work:item.type_of_work.title,
					town:item.town.genitive,
					MoreInfo:item.vacancyRichText,
					payment_to:item.payment_to
				}))
				const totalPage=res.data.total
				
				dispatch(setListVacancies(resData,currentPage,totalPage))
				dispatch(errorUserAC(null))
				dispatch(statusUserAC('succeeded'))
			})
			.catch(error => {
				dispatch(errorUserAC(error.message))
				dispatch(statusUserAC('succeeded'))
			})
	}
}

// get all array saved vacancies
export const NewArrayOfIDs = (IdsArray:Array<string>,currentPage:number) => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		let iteral=0
		let start=(currentPage*4)-4
		if(currentPage==1){
			start=0
		}else if(IdsArray.length-1<start){
			currentPage=currentPage-1
		}


		for(let i=start;i<=IdsArray.length-1;i++){
			if(iteral==4){break}

		iteral=iteral+1
		const id=Number(IdsArray[i])
		Request_token.getCurrentsVacancies(id).then(res => {
				const resData: Array<VacancyDataType> = [{
					id:res.data.id,
					profession:res.data.profession,
					payment_from:res.data.payment_from,
					currency:res.data.currency, 
					type_of_work:res.data.type_of_work.title,
					town:res.data.town.genitive,
					MoreInfo:res.data.vacancyRichText,
					payment_to:res.data.payment_to
				}]
				
				dispatch(setListVacanciesV2(resData))
				dispatch(errorUserAC(null))
				dispatch(statusUserAC('succeeded'))
			})
			.catch(error => {
				dispatch(errorUserAC(error.message))
				dispatch(statusUserAC('succeeded'))
			})


		}
		dispatch(statusUserAC('succeeded'))
		dispatch(setCurrentPageSavedVacancies(currentPage))
		dispatch(setArrayIdAC(IdsArray))

	}
}

// take necessary vacancy
export const getCurrentsVacanciesTC = (arrayVacancy:number) => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		Request_token.getCurrentsVacancies(arrayVacancy)
			.then(res => {
				const resData: Array<VacancyDataType> = [{
					id:res.data.id,
					profession:res.data.profession,
					payment_from:res.data.payment_from,
					currency:res.data.currency, 
					type_of_work:res.data.type_of_work.title,
					town:res.data.town.genitive,
					MoreInfo:res.data.vacancyRichText,
					payment_to:res.data.payment_to
				}]
				
				
				dispatch(setListVacanciesV2(resData))
				dispatch(errorUserAC(null))
				dispatch(statusUserAC('succeeded'))
			})
			.catch(error => {
				dispatch(errorUserAC(error.message))
				dispatch(statusUserAC('succeeded'))
			})
	}
}


// actions
export const authRequestAC = (value: ResultAuthType) =>({ type: 'FROM-AUTH-REQUEST', value } as const)

export const setListVacancies = (value: Array<VacancyDataType>,page:number,totalPage:number) =>({ type: 'SET-LIST-VACANCIES', value,page,totalPage } as const)
export const setListVacanciesV2 = (value: Array<VacancyDataType>) =>({ type: 'SET-LIST-VACANCIES-V2', value } as const)

export const setBranchsAC = (value: Array<BranchsType>) =>({ type: 'SET-BRANCH', value } as const)

export const errorUserAC = (value: string | null) =>({ type: 'ERROR-USER', value } as const)
export const setPage = (value: number) =>({ type: 'SET-PAGE', value } as const)
export const statusUserAC = (value: statusType) =>({ type: 'STATUS-USER', value } as const)
export const deleteStateSavedVacanciesAC = () =>({ type: 'DELETE-SAVED-VACANCIES' } as const)
export const setCurrentPageSavedVacancies = (currentPage:number) =>({ type: 'SET-CURRENT-PAGE-SAVED-VACANCIES',currentPage } as const)


export const setArrayIdAC = (setArrayId:Array<string>) =>({ type: 'SET-ARRAY-ID',setArrayId } as const)
export const setFilterAC = (selectBranch:number,startPrice:number,endPrice:number,inputSearchValue:string) =>({ type: 'SET-FILTER',selectBranch,startPrice,endPrice,inputSearchValue} as const)

// types
export type InitialazedType = {
	error: string | null
	status: statusType
	branchs: Array<BranchsType>
	datasReqAuth: {
		access_token: string | null
		expires_in: number | null
		refresh_token: string | null
		reg_user_resumes_count: string | null
		token_type: string | null
		ttl: number | null
	}
	currentVacancies:Array<VacancyDataType>
	savedVacancies:{
		vacancies:Array<VacancyDataType>
		currentPage:number,
		arrayId:Array<string>
	}
	curentPageVacancies:number
	totalPage:number
	filter:filterType
}

export type filterType={
		selectBranch:number,
		startPrice:number,
		endPrice:number,
		inputSearchValue:string
}

export type VacancyDataType={
	id:number
	profession:string
	payment_from:number
	payment_to:number
	currency:'rub' | 'uah' | 'uzs' 
	type_of_work:string
	town:string,
	MoreInfo:string
}

export type BranchsType = {
	value: string
	label: string
}

interface ResultAuthInterfase {
	access_token: string | null
	expires_in: number | null
	refresh_token: string | null
	reg_user_resumes_count: string | null
	token_type: string | null
	ttl: number | null
}

export type ResultAuthType = {
	access_token: string | null
	expires_in: number | null
	refresh_token: string | null
	reg_user_resumes_count: string | null
	token_type: string | null
	ttl: number | null
}

export type statusType =  'loading' | 'succeeded' 
type actionTypes =
	| ReturnType<typeof authRequestAC>
	| ReturnType<typeof setListVacancies>
	| ReturnType<typeof setBranchsAC>
	| ReturnType<typeof statusUserAC>
	| ReturnType<typeof errorUserAC>
	| ReturnType<typeof setPage>
	| ReturnType<typeof setListVacanciesV2>
	| ReturnType<typeof deleteStateSavedVacanciesAC>
	| ReturnType<typeof setCurrentPageSavedVacancies>
	| ReturnType<typeof setArrayIdAC>
	| ReturnType<typeof setFilterAC>
