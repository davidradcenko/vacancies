import { useEffect } from 'react'
import MainPage from './Layouts/MainPage'
import {getBranchsTC,getPublishVacanciesTC,initializeAppTC,} from './Reducer/initialazedReducer'
import logo from './assets/logo.svg'
import React from "react";
import { RootState, useAppDispatch } from './store/store'
import { useSelector } from 'react-redux';

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
								<a href='#'>Поиск Вакансий</a>
							</li>
							<li>
								<a href='#'>Избранное</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			{/* main page */}
			<MainPage />

			{/* Current info pdg*/}
			{/* <CurrentInfoVacancy /> */}

			{/* saved vacanses info pdg*/}
			{/* <SavedVacancies /> */}
		</>
	)
})

export default App
