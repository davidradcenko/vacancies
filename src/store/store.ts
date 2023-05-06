import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { initialazedReducer } from '../Reducer/initialazedReducer'

const rootReducer = combineReducers({
	initialazed: initialazedReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-expect-error: Unreachable code error
window.store = store
