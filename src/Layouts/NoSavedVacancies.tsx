import { useNavigate } from 'react-router-dom';
import Notfound from '../assets/NoSavedVacancy.png'

export default function NoSavedVacancies() {
	const navigate = useNavigate();
	const Redirect=()=>{
		navigate('/')
	}
	return (
		<>
			<div className='NotFound'>
				<img src={Notfound} alt='Notfound' />
				<p>Упс, здесь еще ничего нет!</p>
				<input onClick={Redirect} type='button' value='Поиск Вакансий' />
			</div>
		</>
	)
}
