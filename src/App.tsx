import { useEffect } from 'react'
import {NavLink, Navigate, Route, Routes} from "react-router-dom";
import {memo} from "react";

import logo from './assets/logo.svg'

import { useAppDispatch } from './store/store'
import MainPage from './Layouts/MainPage'
import {initializeAppTC,} from './Reducer/initialazedReducer'
import SavedVacancies from './Layouts/SavedVacancies';
import { CurrentInfoVacancy } from './Layouts/CurrentInfoVacancy';


/* ------- INTRODUCTION ------- */
/*
	The application router and the top header
*/
const  App = memo(()=> {
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		dispatch(initializeAppTC())
	},[])

	return (
		<>
			<div className='header'>
				<div className='container'>
					<div className='Logo'>
						<img src={logo} alt='logo' />
					</div>

					<nav className='menu'>
						<ul>
							<li>
								<NavLink className={"noSelectLink"} to={'/'}>Поиск Вакансий</NavLink>
							</li>
							<li>
								<NavLink className={"noSelectLink"} to={'Saved'}>Избранное</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			
			<Routes>
				<Route path="/" element={<MainPage />}/>
				<Route path="/Info/:abject" element={<CurrentInfoVacancy />}/>
				<Route path="/Saved/*" element={<SavedVacancies />}/>

				<Route path="/404" element={<h1>404. Page not found</h1>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
			</Routes>
			
		</>
	)
})

export default App
