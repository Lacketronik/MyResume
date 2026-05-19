import axios from 'axios'

const baseURL = import.meta.env.VITE_REACT_APP_API_URL

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
