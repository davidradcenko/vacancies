import axios from 'axios'
import { Dispatch } from 'redux'
import { LoginApi } from '../api/VacanciesAPI'

const Initial: InitialazedType = {
	error: null,
	status: 'idle',
	datasReqAuth: {
		access_token: null,
		expires_in: null,
		refresh_token: null,
		reg_user_resumes_count: null,
		token_type: null,
		ttl: null,
	},
	currentVacancies:[],
	savedVacancies:[],
	curentPageVacancies:1,
	totalPage:0,
	branchs: [],
}

export const initialazedReducer = (
	state: InitialazedType = Initial,
	action: actionTypes
): InitialazedType => {
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
			return {...state,savedVacancies:[...state.savedVacancies,...action.value],curentPageVacancies:action.page,totalPage:action.totalPage}
		}
		default:
			return state
	}
}

// thunks
export const initializeAppTC = () => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		LoginApi.authMe()
			.then(res => {
				const datas: ResultAuthInterfase = res.data
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

export const getPublishVacanciesTC = (currentPage:number) => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		LoginApi.getPublishVacancies(currentPage)
			.then(res => {

				const resData: Array<VacancyDataType> = res.data.objects.map((item: any) => ({
					id:item.id,
					profession:item.profession,
					payment_from:item.payment_from,
					currency:item.currency, 
					type_of_work:item.type_of_work.title,
					town:item.town.genitive,
					MoreInfo:item.vacancyRichText
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



export const getCurrentsVacanciesTC = (currentPage:number,arrayVacancy:number) => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		LoginApi.getCurrentsVacancies(currentPage,arrayVacancy)
			.then(res => {
				const resData: Array<VacancyDataType> = [{
					id:res.data.id,
					profession:res.data.profession,
					payment_from:res.data.payment_from,
					currency:res.data.currency, 
					type_of_work:res.data.type_of_work.title,
					town:res.data.town.genitive,
					MoreInfo:res.data.vacancyRichText
				}]
				const totalPage=10000
				
				dispatch(setListVacanciesV2(resData,currentPage,totalPage))
				dispatch(errorUserAC(null))
				dispatch(statusUserAC('succeeded'))
			})
			.catch(error => {
				dispatch(errorUserAC(error.message))
				dispatch(statusUserAC('succeeded'))
			})
	}
}


export const getBranchsTC = () => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		LoginApi.getBranchs()
			.then(res => {
				const resData: Array<BranchsType> = res.data.map((item: any) => ({
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
	}
}

// actions

export const authRequestAC = (value: ResultAuthType) =>({ type: 'FROM-AUTH-REQUEST', value } as const)

export const setListVacancies = (value: Array<VacancyDataType>,page:number,totalPage:number) =>({ type: 'SET-LIST-VACANCIES', value,page,totalPage } as const)
export const setListVacanciesV2 = (value: Array<VacancyDataType>,page:number,totalPage:number) =>({ type: 'SET-LIST-VACANCIES-V2', value,page,totalPage } as const)

export const setBranchsAC = (value: Array<BranchsType>) =>({ type: 'SET-BRANCH', value } as const)

export const errorUserAC = (value: string | null) =>({ type: 'ERROR-USER', value } as const)
export const setPage = (value: number) =>({ type: 'SET-PAGE', value } as const)
export const statusUserAC = (value: statusType) =>({ type: 'STATUS-USER', value } as const)

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
	savedVacancies:Array<VacancyDataType>
	curentPageVacancies:number
	totalPage:number
}
export type VacancyDataType={
	id:number
	profession:string
	payment_from:number
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
export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type actionTypes =
	| ReturnType<typeof authRequestAC>
	| ReturnType<typeof setListVacancies>
	| ReturnType<typeof setBranchsAC>
	| ReturnType<typeof statusUserAC>
	| ReturnType<typeof errorUserAC>
	| ReturnType<typeof setPage>
	| ReturnType<typeof setListVacanciesV2>
