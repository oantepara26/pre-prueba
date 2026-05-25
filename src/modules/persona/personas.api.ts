import { api } from "@/api/axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Persona } from "./persona.types";
import type {
	BackendPaginationResponse,
	BackendResponse,
} from "@/types/responses";

export async function fetchPersonas(params: {
	page: number;
	perPage: number;
	search?: string;
}): Promise<BackendPaginationResponse<Persona>> {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: "/personas",
		params,
	};

	const response: AxiosResponse<BackendPaginationResponse<Persona>> =
		await api.request(config);

	return response.data;
}

export async function savePersona(
	user: Persona
): Promise<BackendResponse<Persona>> {
	const config: AxiosRequestConfig<Persona> = {
		method: "POST",
		url: "/users",
		data: user,
	};

	const response: AxiosResponse<BackendResponse<Persona>> = await api.request(
		config
	);

	return response.data;
}
