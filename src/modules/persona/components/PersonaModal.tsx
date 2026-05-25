import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { usePersonasPage } from "../hooks/usePersonasPage";
import { PersonaForm } from "./PersonaForm";

export function PersonaModal({
	onSuccessCallback,
}: {
	onSuccessCallback: () => void;
}) {
	const {
		showPersonaModal,
		setShowPersonaModal,
		resetFormData,
		isSubmittingForm,
	} = usePersonasPage();

	const handleClose = (isOpen: boolean) => {
		if (isOpen) return;

		if (isSubmittingForm) return;

		resetFormData();
		setShowPersonaModal(false);
	};

	return (
		<Dialog open={showPersonaModal} onOpenChange={handleClose}>
			<DialogContent
				className="sm:max-w-md max-h-[90vh] flex flex-col"
				onPointerDownOutside={(e) => {
					if (isSubmittingForm) {
						e.preventDefault();
					}
				}}
				onEscapeKeyDown={(e) => {
					if (isSubmittingForm) {
						e.preventDefault();
					}
				}}
				onInteractOutside={(e) => {
					if (isSubmittingForm) {
						e.preventDefault();
					}
				}}
			>
				<DialogHeader>
					<DialogTitle>Registrar Nueva Persona</DialogTitle>
					<DialogDescription>
						Formulario para crear una nueva persona en el sistema
					</DialogDescription>
				</DialogHeader>
				<div className="flex-1 overflow-y-auto pr-1">
					<PersonaForm
						onSuccess={() => {
							onSuccessCallback();
							handleClose(false);
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
