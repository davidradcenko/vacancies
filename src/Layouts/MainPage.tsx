import FilterVacancies from '../Layouts/FilterVacancies'
import InputSearch from '../UI-Components/InputSearch'
import Paginator from '../UI-Components/Paginator'
import location from '../assets/Location.png'
import star from '../assets/Star.png'

export default function MainPage() {
	return (
		<>
			<div className='main'>
				<FilterVacancies />
				<div className='vacancies'>
					<InputSearch />

					<div className='ResultSearch'>
						<div className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p>Менеджер-дизайнер</p>
									<img src={star} alt='star' />
								</div>

								<div className='Salary-and-TypeWork'>
									<p className='In-Salary'>з/п от 70000 rub</p>
									<p className='In-Dart'>•</p>
									<p className='In-Type'>Полный рабочий день</p>
								</div>

								<div className='location'>
									<img src={location} alt='location' />
									<p>Новый Уренгой</p>
								</div>
							</div>
						</div>

						<div className='Main-margin'>
							<div className='Info-Vacancy'>
								<div className='Name-and-Stars'>
									<p>Менеджер-дизайнер</p>
									<img src={star} alt='star' />
								</div>

								<div className='Salary-and-TypeWork'>
									<p className='In-Salary'>з/п от 70000 rub</p>
									<p className='In-Dart'>•</p>
									<p className='In-Type'>Полный рабочий день</p>
								</div>

								<div className='location'>
									<img src={location} alt='location' />
									<p>Новый Уренгой</p>
								</div>
							</div>
						</div>

						<div className='MainPaginator'>
							<Paginator />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
