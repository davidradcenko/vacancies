import axios from 'axios'
import { Dispatch } from 'redux'
import { LoginApi } from '../api/VacanciesAPI'
import SavedVacancies from '../Layouts/SavedVacancies'

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
	savedVacancies:{
		vacancies:[],
		currentPage:1
	},
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
			const nowArray:Array<VacancyDataType>=state.savedVacancies.vacancies
			nowArray.push(action.value[0])

			let mi_array:any=[]
    const currentData  = localStorage.getItem("Id_Vacancies")
    mi_array = currentData ? JSON.parse(currentData) : []
			type m={
				id:number
			}
			const localST:Array<m>=mi_array.map((l:number)=>({id:l}))

			const orderObj = localST.reduce( (a:any,c:any,i:any) => { a[c.id] = i; return a; } , {});
			nowArray.sort( (l:any,r:any) =>  orderObj[l.id] - orderObj[r.id] );
			
			return {...state,savedVacancies:{currentPage:state.savedVacancies.currentPage,vacancies:nowArray},curentPageVacancies:action.page,totalPage:action.totalPage}
			// return {...state,savedVacancies:{currentPage:state.savedVacancies.currentPage,vacancies:[...state.savedVacancies.vacancies,...action.value]},curentPageVacancies:action.page,totalPage:action.totalPage}
		}
		case 'DELETE-SAVED-VACANCIES':{
			return {...state,savedVacancies:{currentPage:state.savedVacancies.currentPage,vacancies:[]}}
		}
		case 'SET-CURRENT-PAGE-SAVED-VACANCIES':{
			return {...state,savedVacancies:{
				currentPage:action.currentPage,
				vacancies:state.savedVacancies.vacancies
			}}
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
		LoginApi.getCurrentsVacancies(arrayVacancy)
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
export const deleteStateSavedVacanciesAC = () =>({ type: 'DELETE-SAVED-VACANCIES' } as const)
export const setCurrentPageSavedVacancies = (currentPage:number) =>({ type: 'SET-CURRENT-PAGE-SAVED-VACANCIES',currentPage } as const)

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
		currentPage:number
	}
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
	| ReturnType<typeof deleteStateSavedVacanciesAC>
	| ReturnType<typeof setCurrentPageSavedVacancies>
