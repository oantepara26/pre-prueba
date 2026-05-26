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

export interface Provincia {
	id: number;
	nombre: string;
}

export interface Ciudad {
	id: number;
	nombre: string;
	provinciaId: number;
}

export interface Canton {
	id: number;
	nombre: string;
	ciudadId: number;
}

export async function fetchProvincias(): Promise<BackendResponse<Provincia[]>> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const data: Provincia[] = Array.from({ length: 2 }, (_, index) => ({
		id: index + 1,
		nombre: `Provincia ${index + 1}`,
	}));

	return {
		success: true,
		data,
	};
}

export async function fetchCiudades(
	provinciaId: number
): Promise<BackendResponse<Ciudad[]>> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const data: Ciudad[] = Array.from({ length: 3 }, (_, index) => ({
		id: Number(`${provinciaId}${index + 1}`),
		nombre: `Ciudad ${index + 1}`,
		provinciaId,
	}));

	return {
		success: true,
		data,
	};
}

export async function fetchCantones(
	provinciaId: number,
	ciudadId: number
): Promise<BackendResponse<Canton[]>> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const data: Canton[] = Array.from({ length: 3 }, (_, index) => ({
		id: Number(`${provinciaId}${ciudadId}${index + 1}`),
		nombre: `Canton ${index + 1}`,
		ciudadId,
	}));

	return {
		success: true,
		data,
	};
}

export async function fetchPersonaById(
	id: number
): Promise<BackendResponse<Persona>> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const data: Persona = {
		id,
		name: `Persona ${id}`,
		username: `usuario${id}`,
		email: `persona${id}@correo.com`,
		phone: "+593 99 999 9999",
		website: `https://persona${id}.com`,
		provinciaId: 1,
		ciudadId: 11,
		cantonId: 111,
	};

	return {
		success: true,
		data,
	};
}
