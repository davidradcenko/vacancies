import axios from 'axios'

const login = 'sergei.stralenia@gmail.com'
const password = 'paralect123'
const client_id = 2356
const client_secret =
	'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
const hr = 0

const instance = axios.create({
	baseURL: `https://startup-summer-2023-proxy.onrender.com/2.0/`,
	headers: {
		'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
		'X-User-Type': 'reg_user',
	},
	withCredentials: true,
})

export const LoginApi = {
	authMe() {
		return instance.get(
			`oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}`
		)
	},
	getBranchs() {
		return instance.get('catalogues/')
	},
}
// ?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}
