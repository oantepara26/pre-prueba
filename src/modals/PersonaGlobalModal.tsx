import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import clsx from "clsx";

import {
	fetchCantones,
	fetchCiudades,
	fetchProvincias,
	savePersona,
	type Canton,
	type Ciudad,
	type Provincia,
} from "@/modules/persona/personas.api";
import {
	initialPersonaFormData,
	usePersonaGlobalModalStore,
} from "@/store/personaModal.store";
import {
	personaSchema,
	type PersonaFormValues,
} from "@/modules/persona/persona.schema";

export default function PersonaGlobalModal() {
	const showPersonaModal = usePersonaGlobalModalStore(
		(state) => state.showPersonaModal
	);
	const formData = usePersonaGlobalModalStore((state) => state.formData);
	const onSuccess = usePersonaGlobalModalStore((state) => state.onSuccess);
	const closePersonaModal = usePersonaGlobalModalStore(
		(state) => state.closePersonaModal
	);
	const setFormData = usePersonaGlobalModalStore(
		(state) => state.setFormData
	);

	const [provincias, setProvincias] = useState<Provincia[]>([]);
	const [ciudades, setCiudades] = useState<Ciudad[]>([]);
	const [cantones, setCantones] = useState<Canton[]>([]);
	const [isLoadingLocations, setIsLoadingLocations] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		control,
		getValues,
		formState: { errors, isValid, isSubmitting },
	} = useForm<PersonaFormValues>({
		resolver: zodResolver(personaSchema),
		mode: "onChange",
		defaultValues: initialPersonaFormData,
	});

	const provinciaId = useWatch({
		control,
		name: "provinciaId",
	});

	const ciudadId = useWatch({
		control,
		name: "ciudadId",
	});

	const cantonId = useWatch({
		control,
		name: "cantonId",
	});

	useEffect(() => {
		if (!showPersonaModal) return;

		const loadProvincias = async () => {
			try {
				setIsLoadingLocations(true);
				const response = await fetchProvincias();
				setProvincias(response.data);
			} catch {
				toast.error("No se pudieron cargar las provincias.");
			} finally {
				setIsLoadingLocations(false);
			}
		};

		reset(formData);
		void loadProvincias();
	}, [formData, reset, showPersonaModal]);

	const handleStoreSync = () => {
		setFormData(getValues());
	};

	const handleProvinciaChange = async (value: string) => {
		const provinciaSeleccionada = Number(value);

		setValue("provinciaId", provinciaSeleccionada, {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("ciudadId", 0, {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("cantonId", 0, {
			shouldValidate: true,
			shouldDirty: true,
		});

		setFormData({
			...getValues(),
			provinciaId: provinciaSeleccionada,
			ciudadId: 0,
			cantonId: 0,
		});

		setCiudades([]);
		setCantones([]);

		try {
			setIsLoadingLocations(true);
			const response = await fetchCiudades(provinciaSeleccionada);
			setCiudades(response.data);
		} finally {
			setIsLoadingLocations(false);
		}
	};
	const handleCiudadChange = async (value: string) => {
		const ciudadSeleccionada = Number(value);

		setValue("ciudadId", ciudadSeleccionada, {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("cantonId", 0, {
			shouldValidate: true,
			shouldDirty: true,
		});

		setFormData({
			...getValues(),
			ciudadId: ciudadSeleccionada,
			cantonId: 0,
		});

		setCantones([]);

		try {
			setIsLoadingLocations(true);
			const response = await fetchCantones(
				provinciaId,
				ciudadSeleccionada
			);
			setCantones(response.data);
		} finally {
			setIsLoadingLocations(false);
		}
	};

	const handleCantonChange = (value: string) => {
		const cantonSeleccionado = Number(value);

		setValue("cantonId", cantonSeleccionado, {
			shouldValidate: true,
			shouldDirty: true,
		});

		handleStoreSync();
	};

	const handleClose = (isOpen: boolean) => {
		if (isOpen) return;
		if (isSubmitting) return;

		reset(initialPersonaFormData);
		setCiudades([]);
		setCantones([]);
		closePersonaModal();
	};

	const onSubmit = async (data: PersonaFormValues) => {
		try {
			const response = await savePersona(data);

			if (!response.success) throw new Error("Error");

			toast.success("Persona creada correctamente.");

			await onSuccess?.();
			handleClose(false);
		} catch {
			toast.error("No se pudo guardar la persona.");
		}
	};

	return (
		<Dialog open={showPersonaModal} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col px-0 overflow-hidden">
				<DialogHeader className="px-6">
					<DialogTitle>Registrar Nueva Persona</DialogTitle>
					<DialogDescription>
						Formulario para crear una nueva persona en el sistema
					</DialogDescription>
				</DialogHeader>

				<form
					id="persona-form"
					onSubmit={handleSubmit(onSubmit)}
					className={clsx("flex-1 min-h-0 overflow-y-auto px-6", {
						"pointer-events-none opacity-80": isSubmitting,
					})}
				>
					<Field>
						<FieldLabel>ID</FieldLabel>
						<Input
							{...register("id", { valueAsNumber: true })}
							type="number"
							placeholder="Ej: 1"
						/>
						{errors.id && (
							<FieldError>{errors.id.message}</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Nombre</FieldLabel>
						<Input {...register("name")} placeholder="Juan Pérez" />
						{errors.name && (
							<FieldError>{errors.name.message}</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Usuario</FieldLabel>
						<Input
							{...register("username")}
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
							placeholder="juan@email.com"
						/>
						{errors.email && (
							<FieldError>{errors.email.message}</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Teléfono</FieldLabel>
						<Input
							{...register("phone")}
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
							placeholder="https://empresa.com"
						/>
						{errors.website && (
							<FieldError>{errors.website.message}</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Provincia</FieldLabel>
						<Select
							value={provinciaId ? String(provinciaId) : ""}
							onValueChange={handleProvinciaChange}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccionar provincia" />
							</SelectTrigger>
							<SelectContent>
								{provincias.map((provincia) => (
									<SelectItem
										key={provincia.id}
										value={String(provincia.id)}
									>
										{provincia.nombre}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.provinciaId && (
							<FieldError>
								{errors.provinciaId.message}
							</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Ciudad</FieldLabel>
						<Select
							disabled={!provinciaId}
							value={ciudadId ? String(ciudadId) : ""}
							onValueChange={handleCiudadChange}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccionar ciudad" />
							</SelectTrigger>
							<SelectContent>
								{ciudades.map((ciudad) => (
									<SelectItem
										key={ciudad.id}
										value={String(ciudad.id)}
									>
										{ciudad.nombre}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.ciudadId && (
							<FieldError>{errors.ciudadId.message}</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Cantón</FieldLabel>
						<Select
							disabled={!ciudadId}
							value={cantonId ? String(cantonId) : ""}
							onValueChange={handleCantonChange}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccionar cantón" />
							</SelectTrigger>
							<SelectContent>
								{cantones.map((canton) => (
									<SelectItem
										key={canton.id}
										value={String(canton.id)}
									>
										{canton.nombre}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.cantonId && (
							<FieldError>{errors.cantonId.message}</FieldError>
						)}
					</Field>

					{isLoadingLocations && (
						<div className="text-sm text-muted-foreground">
							Cargando ubicaciones...
						</div>
					)}
				</form>

				<DialogFooter className="px-6 pr-8">
					<Button
						type="submit"
						form="persona-form"
						disabled={!isValid || isSubmitting}
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/*
const openCreatePersonaModal = usePersonaGlobalModalStore(
	(state) => state.openCreatePersonaModal
);

<Button
						type="button"
						onClick={() => {
							openCreatePersonaModal(async () => {
								console.log("xxx");
							});
						}}
					>
						Nueva Persona
					</Button>*/
