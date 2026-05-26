import { create } from "zustand";
import type { Persona } from "./persona.types";

interface PersonaPageStore {
	page: number;
	perPage: number;
	search: string;

	setPage: (page: number) => void;

	setPerPage: (perPage: number) => void;

	setSearch: (search: string) => void;

	formData: Persona;
	setFormData: (data: Partial<Persona>) => void;

	resetFormData: () => void;

	showPersonaModal: boolean;
	setShowPersonaModal: (showPersonaModal: boolean) => void;

	isSubmittingForm: boolean;
	setIsSubmittingForm: (isSubmittingForm: boolean) => void;

	isEditingPersona: boolean;
	setIsEditingPersona: (isEditingPersona: boolean) => void;
}

export const initialPersonaFormData: Persona = {
	id: 0,
	name: "",
	username: "",
	email: "",
	phone: "",
	website: "",
	provinciaId: 0,
	ciudadId: 0,
	cantonId: 0,
};

export const usePersonasPageStore = create<PersonaPageStore>((set) => ({
	page: 1,
	perPage: 10,
	search: "",
	showPersonaModal: false,
	isSubmittingForm: false,
	formData: initialPersonaFormData,
	isEditingPersona: false,
	setShowPersonaModal: (showPersonaModal) =>
		set({
			showPersonaModal,
		}),
	setPage: (page) =>
		set({
			page,
		}),

	setPerPage: (perPage) =>
		set({
			perPage,
		}),

	setSearch: (search) =>
		set({
			search,
			page: 1,
		}),

	setFormData: (data) =>
		set((state) => ({
			formData: {
				...state.formData,
				...data,
			},
		})),

	resetFormData: () =>
		set({
			formData: initialPersonaFormData,
		}),
	setIsSubmittingForm: (isSubmittingForm) =>
		set({
			isSubmittingForm,
		}),

	setIsEditingPersona: (isEditingPersona) =>
		set({
			isEditingPersona,
		}),
}));

export const selectIsDifferentDomain = (state: PersonaPageStore): boolean => {
	if (!state.formData.email || !state.formData.website) return false;

	try {
		const emailDomain = state.formData.email.split("@")[1]?.toLowerCase();

		let urlString = state.formData.website.trim();
		if (!/^https?:\/\//i.test(urlString)) {
			urlString = `https://${urlString}`;
		}

		const websiteUrl = new URL(urlString);
		const websiteDomain = websiteUrl.hostname
			.replace("www.", "")
			.toLowerCase();

		return emailDomain !== websiteDomain;
	} catch {
		return false;
	}
};
