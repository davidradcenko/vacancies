import axios from 'axios'
import { Dispatch } from 'redux'
import { LoginApi, dd, setAuthForAXIOS } from '../api/VacanciesAPI'
import SavedVacancies from '../Layouts/SavedVacancies'
import { useAppDispatch } from '../store/store'

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
		currentPage:1,
		arrayId:[]
	},
	curentPageVacancies:1,
	totalPage:0,
	branchs: [],
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

export const getPublishVacanciesTC = (currentPage:number) => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		dd.getPublishVacancies(currentPage)
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
		dd.getCurrentsVacancies(id).then(res => {
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
				
				dispatch(setListVacanciesV2(resData))
				dispatch(errorUserAC(null))
				dispatch(statusUserAC('succeeded'))
			})
			.catch(error => {
				dispatch(errorUserAC(error.message))
				dispatch(statusUserAC('succeeded'))
			})


		}
		dispatch(setCurrentPageSavedVacancies(currentPage))

		dispatch(setArrayIdAC(IdsArray))

	}
}




export const getCurrentsVacanciesTC = (arrayVacancy:number) => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		dd.getCurrentsVacancies(arrayVacancy)
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
export const setListVacanciesV2 = (value: Array<VacancyDataType>) =>({ type: 'SET-LIST-VACANCIES-V2', value } as const)

export const setBranchsAC = (value: Array<BranchsType>) =>({ type: 'SET-BRANCH', value } as const)

export const errorUserAC = (value: string | null) =>({ type: 'ERROR-USER', value } as const)
export const setPage = (value: number) =>({ type: 'SET-PAGE', value } as const)
export const statusUserAC = (value: statusType) =>({ type: 'STATUS-USER', value } as const)
export const deleteStateSavedVacanciesAC = () =>({ type: 'DELETE-SAVED-VACANCIES' } as const)
export const setCurrentPageSavedVacancies = (currentPage:number) =>({ type: 'SET-CURRENT-PAGE-SAVED-VACANCIES',currentPage } as const)


export const setArrayIdAC = (setArrayId:Array<string>) =>({ type: 'SET-ARRAY-ID',setArrayId } as const)

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
	| ReturnType<typeof setArrayIdAC>
