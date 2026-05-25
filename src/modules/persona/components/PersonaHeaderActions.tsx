import { ActionButton } from "@/components/ActionButton";
import { HeaderPageMoreActions } from "@/components/HeaderPageMoreActions";
import { HeaderPageMoreActionsItem } from "@/components/HeaderPageMoreActionsItem";
import {
	BadgeDollarSign,
	CopyPlus,
	ListChecks,
	Printer,
	Save,
	Search,
} from "lucide-react";

export default function PersonaHeaderActions() {
	return (
		<>
			<ActionButton
				icon={Search}
				color="blue"
				onClick={() => console.log("search")}
			/>

			<ActionButton
				icon={Save}
				color="blue"
				onClick={() => console.log("search")}
			/>

			<ActionButton
				icon={BadgeDollarSign}
				color="green"
				onClick={() => console.log("search")}
			/>

			<ActionButton
				icon={CopyPlus}
				color="red"
				onClick={() => console.log("search")}
			/>

			<ActionButton
				icon={ListChecks}
				color="orange"
				onClick={() => console.log("search")}
			/>

			<HeaderPageMoreActions>
				<HeaderPageMoreActionsItem
					icon={Printer}
					title="Eliminar"
					onClick={() => console.log("search")}
				/>
			</HeaderPageMoreActions>
		</>
	);
}
