import location from '../assets/Location.png'
import star from '../assets/Star.png'
export default function CurrentInfoVacancy() {
	return (
		<>
			<div className='Main-Info-Vacancy'>
				<div className='Main-Info-Container'>
					<div className='Main-Info-Name-and-Stars'>
						<p>Менеджер-дизайнер</p>
						<img src={star} alt='star' />
					</div>

					<div className='Main-Info-Salary-and-TypeWork'>
						<p className='Main-Info-In-Salary'>з/п от 70000 rub</p>
						<p className='Main-Info-In-Dart'>•</p>
						<p className='Main-Info-In-Type'>Полный рабочий день</p>
					</div>

					<div className='Main-Info-location'>
						<img src={location} alt='location' />
						<p>Новый Уренгой</p>
					</div>
				</div>
			</div>

			<div className='current-Info-Vacancy'>
				<div className='current-Info-container'>
					<div className='BlockCurrentInfo'>
						<p className='Name-Current-Info'>Обязанности:</p>
						<ul>
							<li>
								Разработка дизайн-макетов для наружной, интерьерной рекламы,
								полиграфии, сувенирной продукции.
							</li>
							<li>
								Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.
							</li>
							<li>Создание дизайна логотипов и брендбуков</li>
							<li>
								Управленческая функция: обучение, адаптация дизайнеров, их
								контроль, оценка
							</li>
						</ul>
					</div>

					<div className='BlockCurrentInfo'>
						<p className='Name-Current-Info'>Требования:</p>
						<ul>
							<li>
								Разработка дизайн-макетов для наружной, интерьерной рекламы,
								полиграфии, сувенирной продукции.
							</li>
							<li>
								Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.
							</li>
							<li>Создание дизайна логотипов и брендбуков</li>
							<li>
								Управленческая функция: обучение, адаптация дизайнеров, их
								контроль, оценка
							</li>
						</ul>
					</div>

					<div className='BlockCurrentInfo'>
						<p className='Name-Current-Info'>Условия:</p>
						<ul>
							<li>
								Разработка дизайн-макетов для наружной, интерьерной рекламы,
								полиграфии, сувенирной продукции.
							</li>
							<li>
								Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.
							</li>
							<li>Создание дизайна логотипов и брендбуков</li>
							<li>
								Управленческая функция: обучение, адаптация дизайнеров, их
								контроль, оценка
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
