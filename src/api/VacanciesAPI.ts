import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password',
	headers: {
		'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
	},
	withCredentials: true,
})

export const LoginApi = {
	authMe() {
		return instance.get('/auth/me')
	},
}
