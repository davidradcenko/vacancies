import axios from 'axios'


/* ------- INTRODUCTION ------- */
/* 
	Using the axios library, I send requests to the server and have the ability to request these requests anywhere in the application
*/

// Starting keys
const login = 'sergei.stralenia@gmail.com'
const password = 'paralect123'
const client_id = 2356
const client_secret =
	'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'


// Set token in header auto initialization
export function setAuthForAXIOS(token:string){
	axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
}

// Request for initial authorization
const instance = axios.create({
	baseURL: `https://startup-summer-2023-proxy.onrender.com/2.0/`,
	headers: {
		'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
		'X-User-Type': 'reg_user',
	},
	withCredentials: true,
})

// Request after authorization with token
const instanceBeforAuth = axios.create({
	baseURL: `https://startup-summer-2023-proxy.onrender.com/2.0/`,
	headers: {
		'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
		'X-Api-App-Id':'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
	},
})


// Request that do not require authorization and a token
export const LoginApi = {

	// authorization
	authMe() {
		return instance.get(
			`oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}`
		)
	},

	// Getting industries
	getBranchs() {
		return instance.get('catalogues/')
	}
}

// Request with authorization and a token
export const Request_token = {

	/* Getting vacancies, depending on the data, the request may be with data from a filter, a search page,
	 or just the latest vacancies without additional filtering parameters */
	getPublishVacancies(page:number,catalogues:number,payment_from:number,payment_to:number,valueSearch:string){
		let way= `vacancies/?
		page=${page}&
		count=4&
		published=1&
		no_agreement=1&
		${valueSearch==''?'':`keyword=${valueSearch}&`}
		${payment_from==0?'':`payment_from=${payment_from}&`}
		${payment_to==0?'':`payment_to=${payment_to}&`}
		${catalogues==0?'':`catalogues=${catalogues}`}
		`
		if(way.endsWith("&")){
			way=way.slice(0,-1)
		}
		return instanceBeforAuth.get(way)
	},

	// get one necessary vacancy
	getCurrentsVacancies(id:number){
		return instanceBeforAuth.get(`vacancies/${id}/`)
	},

} 