import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { personaSchema, type PersonaFormValues } from "../persona.schema";
import {
	initialPersonaFormData,
	selectIsDifferentDomain,
	usePersonasPageStore,
} from "../persona.store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { savePersona } from "../personas.api";
import { usePersonasPage } from "../hooks/usePersonasPage";

export function PersonaForm({ onSuccess }: { onSuccess: () => void }) {
	const { setFormData, setIsSubmittingForm } = usePersonasPage();

	const isDomainMismatched = usePersonasPageStore(selectIsDifferentDomain);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		getValues,
	} = useForm<PersonaFormValues>({
		resolver: zodResolver(personaSchema),
		mode: "onChange",
		defaultValues: initialPersonaFormData,
	});

	const onSubmit = async (data: PersonaFormValues) => {
		try {
			setIsSubmittingForm(true);
			const response = await savePersona(data);

			if (!response.success) throw new Error("Error del servidor");

			toast.success("Los datos se han guardado correctamente.");

			onSuccess();
		} catch {
			toast.error(
				"Hubo un problema al intentar guardar la persona. Intenta de nuevo."
			);
		} finally {
			setIsSubmittingForm(false);
		}
	};

	const handleStoreSync = () => {
		setFormData(getValues());
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={`space-y-4 ${
				isSubmitting ? "pointer-events-none opacity-80" : ""
			}`}
		>
			<Field>
				<FieldLabel>ID</FieldLabel>
				<Input
					{...register("id", { valueAsNumber: true })}
					type="number"
					aria-invalid={!!errors.id}
					placeholder="Ej: 123"
				/>
				{errors.id && <FieldError>{errors.id.message}</FieldError>}
			</Field>

			<Field>
				<FieldLabel>Nombre</FieldLabel>
				<Input
					{...register("name")}
					aria-invalid={!!errors.name}
					placeholder="Juan Pérez"
				/>
				{errors.name && <FieldError>{errors.name.message}</FieldError>}
			</Field>

			<Field>
				<FieldLabel>Usuario</FieldLabel>
				<Input
					{...register("username")}
					aria-invalid={!!errors.username}
					placeholder="jperez99"
				/>
				{errors.username && (
					<FieldError>{errors.username.message}</FieldError>
				)}
			</Field>

			<Field>
				<FieldLabel>Email</FieldLabel>
				<Input
					{...register("email", {
						onChange: handleStoreSync,
					})}
					type="email"
					aria-invalid={!!errors.email}
					placeholder="juan@ejemplo.com"
				/>
				{errors.email && (
					<FieldError>{errors.email.message}</FieldError>
				)}
			</Field>

			<Field>
				<FieldLabel>Teléfono</FieldLabel>
				<Input
					{...register("phone")}
					type="tel"
					aria-invalid={!!errors.phone}
					placeholder="+593 99 999 9999"
				/>
				{errors.phone && (
					<FieldError>{errors.phone.message}</FieldError>
				)}
			</Field>

			<Field>
				<FieldLabel>Sitio Web</FieldLabel>
				<Input
					{...register("website", {
						onChange: handleStoreSync,
					})}
					type="url"
					aria-invalid={!!errors.website}
					placeholder="https://ejemplo.com"
				/>
				{errors.website && (
					<FieldError>{errors.website.message}</FieldError>
				)}
			</Field>

			{isDomainMismatched && (
				<div className="p-3 text-sm text-amber-800 bg-amber-100 rounded-md">
					⚠️ Advertencia: El dominio del email no coincide con el del
					sitio web registrado.
				</div>
			)}

			<Button
				type="submit"
				disabled={!isValid || isSubmitting}
				className="w-full mt-6"
			>
				{isSubmitting ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Guardando...
					</>
				) : (
					"Guardar Persona"
				)}
			</Button>
		</form>
	);
}
