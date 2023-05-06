import Notfound from '../assets/NoSavedVacancy.png'

export default function NoSavedVacancies() {
	return (
		<>
			<div className='NotFound'>
				<img src={Notfound} alt='Notfound' />
				<p>Упс, здесь еще ничего нет!</p>
				<input type='button' value='Поиск Вакансий' />
			</div>
		</>
	)
}
