import { z } from "zod";

export const personaSchema = z.object({
	id: z.number().min(1, "Id requerido"),

	name: z.string().min(3, "Nombre mínimo 3 caracteres"),

	username: z.string().min(3, "Username mínimo 3 caracteres"),

	email: z.email("Email inválido"),

	phone: z.string().min(7, "Teléfono inválido"),

	website: z.string().min(3, "Website requerido"),
});

export type PersonaFormValues = z.infer<typeof personaSchema>;
