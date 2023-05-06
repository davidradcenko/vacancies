import { Dispatch } from 'redux'
import { LoginApi } from '../api/VacanciesAPI'

const Initial: InitialazedType = {
	initialazUser: false,
	error: null,
	status: 'idle',
	mainUserId: 16939,
	name: '',
	foto: '' || null,
}

export const initialazedReducer = (
	state: InitialazedType = Initial,
	action: actionTypes
): InitialazedType => {
	switch (action.type) {
		case 'INITIALAZED-USER':
			return { ...state, initialazUser: action.value }
		case 'STATUS-USER': {
			return { ...state, status: action.value }
		}
		case 'ERROR-USER': {
			return { ...state, error: action.value }
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
				debugger
				if (res.data.resultCode === 0) {
					dispatch(statusUserAC('succeeded'))
					console.log('YES')
				} else {
					dispatch(errorUserAC(res.data))
					dispatch(statusUserAC('succeeded'))
				}
			})
			.catch(error => {
				dispatch(errorUserAC(error))
			})
	}
}
// actions
export const initializedUserAC = (value: boolean) =>
	({ type: 'INITIALAZED-USER', value } as const)

export const errorUserAC = (value: string | null) =>
	({ type: 'ERROR-USER', value } as const)

export const statusUserAC = (value: statusType) =>
	({ type: 'STATUS-USER', value } as const)

// types
export type InitialazedType = {
	initialazUser: boolean
	error: string | null
	status: statusType
	mainUserId: number
	name: string
	foto: string | null
}
export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type actionTypes =
	| ReturnType<typeof initializedUserAC>
	| ReturnType<typeof statusUserAC>
	| ReturnType<typeof errorUserAC>
