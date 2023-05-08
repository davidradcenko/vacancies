import { useEffect } from 'react'
import MainPage from './Layouts/MainPage'
import {
	getBranchsTC,
	getPublishVacanciesTC,
	initializeAppTC,
} from './Reducer/initialazedReducer'
import logo from './assets/logo.svg'
import { useAppDispatch } from './store/store'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(initializeAppTC())
		dispatch(getBranchsTC())

		// dispatch(getPublishVacanciesTC())
	}, [])

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
}

export default App
