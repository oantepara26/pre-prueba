import { z } from "zod";

export const personaSchema = z.object({
	id: z.number().min(1, "Id requerido"),

	name: z.string().min(3, "Nombre mínimo 3 caracteres"),

	username: z.string().min(3, "Username mínimo 3 caracteres"),

	email: z.email("Email inválido"),

	phone: z.string().min(7, "Teléfono inválido"),

	website: z.string().min(3, "Website requerido"),

	provinciaId: z.number().min(1, "Provincia requerida"),

	ciudadId: z.number().min(1, "Ciudad requerida"),

	cantonId: z.number().min(1, "Cantón requerido"),
});

export type PersonaFormValues = z.infer<typeof personaSchema>;
