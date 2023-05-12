import { useEffect } from 'react'
import MainPage from './Layouts/MainPage'
import {getBranchsTC,getPublishVacanciesTC,initializeAppTC,} from './Reducer/initialazedReducer'
import logo from './assets/logo.svg'
import React from "react";
import { RootState, useAppDispatch } from './store/store'
import { useSelector } from 'react-redux';
import SavedVacancies from './Layouts/SavedVacancies';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import { CurrentInfoVacancy } from './Layouts/CurrentInfoVacancy';

const  App=React.memo((props:any)=> {
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
								<Link to={'/'}>Поиск Вакансий</Link>
							</li>
							<li>
								<Link to={'Saved'}>Избранное</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			
			<Routes>
				<Route path="/" element={<MainPage />}/>
				<Route path="/Info/:id?:from" element={<CurrentInfoVacancy />}/>
				<Route path="/Saved" element={<SavedVacancies />}/>

				<Route path="/404" element={<h1>404. Page not found</h1>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
			</Routes>
			
		</>
	)
})

export default App
