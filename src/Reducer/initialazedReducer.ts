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



				// dispatch(statusUserAC('loading'))
				// LoginApi.getPublishVacancies()
				// 	.then(res => {
				// 		const datas: ResultAuthInterfase = res.data
				// 		debugger
				// 		dispatch(errorUserAC(null))
				// 		dispatch(statusUserAC('succeeded'))
				// 	})
				// 	.catch(error => {
				// 		dispatch(errorUserAC(error.response.data.notification_type))
				// 		dispatch(statusUserAC('succeeded'))
				// 	})




			})
			.catch(error => {
				dispatch(errorUserAC(error.response.data.notification_type))
				dispatch(statusUserAC('succeeded'))
			})
	}
}

// export const getPublishVacanciesTC = () => {
// 	return (dispatch: Dispatch<actionTypes>) => {
// 		dispatch(statusUserAC('loading'))
// 		LoginApi.getPublishVacancies()
// 			.then(res => {
// 				const datas: ResultAuthInterfase = res.data
// 				debugger
// 				dispatch(errorUserAC(null))
// 				dispatch(statusUserAC('succeeded'))
// 			})
// 			.catch(error => {
// 				dispatch(errorUserAC(error.response.data.notification_type))
// 				dispatch(statusUserAC('succeeded'))
// 			})
// 	}
// }



export const getBranchsTC = () => {
	return (dispatch: Dispatch<actionTypes>) => {
		dispatch(statusUserAC('loading'))
		LoginApi.getBranchs()
			.then(res => {
				debugger
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
				dispatch(errorUserAC(error.response.data.notification_type))
				dispatch(statusUserAC('succeeded'))
			})
	}
}

// actions

export const authRequestAC = (value: ResultAuthType) =>
	({ type: 'FROM-AUTH-REQUEST', value } as const)

export const setBranchsAC = (value: Array<BranchsType>) =>
	({ type: 'SET-BRANCH', value } as const)

export const errorUserAC = (value: string | null) =>
	({ type: 'ERROR-USER', value } as const)

export const statusUserAC = (value: statusType) =>
	({ type: 'STATUS-USER', value } as const)

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
	| ReturnType<typeof setBranchsAC>
	| ReturnType<typeof statusUserAC>
	| ReturnType<typeof errorUserAC>
