import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const api = axios.create({
	baseURL: "http://localhost:4000",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem("token");
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const status = error.response?.status;
		let message = "Error en la petición";

		if (status === 401)
			message = "No autorizado. Inicia sesión nuevamente.";
		else if (status === 403) message = "No tienes permiso para esto.";
		else if (status === 404) message = "Recurso no encontrado.";
		else if (status === 500) message = "Error interno del servidor.";
		else if (status) message = `Error ${status}`;

		toast.error(message);
		return Promise.reject(error);
	}
);
