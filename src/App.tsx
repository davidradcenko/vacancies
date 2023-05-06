import SavedVacancies from './Layouts/SavedVacancies'
import logo from './assets/logo.svg'
function App() {
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
			{/* <MainPage /> */}

			{/* Current info pdg*/}
			{/* <CurrentInfoVacancy /> */}

			{/* saved vacanses info pdg*/}
			<SavedVacancies />
		</>
	)
}

export default App
