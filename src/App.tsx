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

			<div className='main'>
				<div className='filter'>
					<form action=''>
						<div className='filter-container'>
							<div className='Name-Filter'>
								<p>Фильтры</p>
								<p>Сбросить все</p>
							</div>

							<label htmlFor='1'>Отрасль</label>
							<input id='1' name='Otrsl' type='text' />

							<label>Оклад</label>
							<input type='text' />
							<input type='text' />

							<input type='button' value={'Применить'} />
						</div>
					</form>
				</div>
				<div className='vacancies'></div>
			</div>
		</>
	)
}

export default App
