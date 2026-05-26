import { Users } from "lucide-react";

import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import "react-data-grid/lib/styles.css";

import HeaderPage from "../../components/HeaderPage";
import PersonaHeaderActions from "./components/PersonaHeaderActions";
import { PersonaModal } from "./components/PersonaModal";
import PersonasTable from "./components/PersonasTable";
import { usePersonasPage } from "./hooks/usePersonasPage";

export default function PersonasPage() {
	const {
		search,
		setSearch,
		data,
		isLoading,

		setShowPersonaModal,
		setIsEditingPersona,

		resetFormData,
	} = usePersonasPage();

	const handleCreatePersona = () => {
		resetFormData();

		setIsEditingPersona(false);

		setShowPersonaModal(true);
	};

	return (
		<div className="min-h-screen bg-slate-100 p-6">
			<div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
				<HeaderPage title="Personas" icon={Users} color="red">
					<PersonaHeaderActions />
				</HeaderPage>

				<div className="p-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
						<SearchInput
							placeholder="Buscar ..."
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							onClear={() => setSearch("")}
						/>

						<div className="flex justify-end gap-2">
							<Button type="button" onClick={handleCreatePersona}>
								<Users />
								Nuevo Persona
							</Button>
						</div>
					</div>

					<PersonasTable
						data={data}
						isLoading={isLoading}
						onSuccessEdit={() => {
							console.log("xxx");
						}}
					/>

					<PersonaModal
						onSuccessCallback={() => {
							console.log("xxx");
						}}
					/>
				</div>
			</div>
		</div>
	);
}
