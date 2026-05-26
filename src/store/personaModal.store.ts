import type { Persona } from "@/modules/persona/persona.types";
import { create } from "zustand";

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

type PersonaModalOnSuccess = () => void | Promise<void>;

type PersonaModalStore = {
	showPersonaModal: boolean;

	formData: Persona;

	onSuccess?: PersonaModalOnSuccess;

	openCreatePersonaModal: (onSuccess?: PersonaModalOnSuccess) => void;

	setFormData: (value: Persona) => void;

	resetFormData: () => void;

	closePersonaModal: () => void;
};

export const usePersonaGlobalModalStore = create<PersonaModalStore>((set) => ({
	showPersonaModal: false,

	formData: initialPersonaFormData,

	onSuccess: undefined,

	openCreatePersonaModal: (onSuccess) => {
		set({
			showPersonaModal: true,
			formData: initialPersonaFormData,
			onSuccess,
		});
	},

	setFormData: (value) => {
		set({
			formData: value,
		});
	},

	resetFormData: () => {
		set({
			formData: initialPersonaFormData,
		});
	},

	closePersonaModal: () => {
		set({
			showPersonaModal: false,
			formData: initialPersonaFormData,
			onSuccess: undefined,
		});
	},
}));
