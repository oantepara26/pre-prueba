import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { DataGrid, type Column } from "react-data-grid";

import type { BackendPaginationResponse } from "@/types/responses";
import "react-data-grid/lib/styles.css";

import type { Persona } from "../persona.types";
import { fetchPersonaById } from "../personas.api";
import { usePersonasPage } from "../hooks/usePersonasPage";

type PersonasTableProps = {
	isLoading: boolean;
	data: BackendPaginationResponse<Persona>;
	onSuccessEdit: () => void;
};

export default function PersonasTable({
	data,
	isLoading,
	onSuccessEdit,
}: PersonasTableProps) {
	const { setFormData, setShowPersonaModal, setIsEditingPersona } =
		usePersonasPage();

	const handleEdit = async (row: Persona) => {
		const response = await fetchPersonaById(row.id);

		if (!response.success) return;

		setFormData(response.data);

		setIsEditingPersona(true);

		setShowPersonaModal(true);

		onSuccessEdit();
	};

	const columns = useMemo<Column<Persona>[]>(() => {
		return [
			{
				key: "id",
				name: "ID",
				resizable: true,
				width: 80,
			},
			{
				key: "name",
				name: "NAME",
				resizable: true,
				width: 250,
			},
			{
				key: "username",
				name: "USERNAME",
				resizable: true,
				width: 180,
			},
			{
				key: "email",
				name: "EMAIL",
				resizable: true,
				width: 220,
			},
			{
				key: "phone",
				name: "PHONE",
				resizable: true,
				width: 180,
			},
			{
				key: "website",
				name: "WEBSITE",
				resizable: true,
				width: 200,
			},
			{
				key: "acciones",
				name: "ACCIONES",
				width: 120,
				renderCell: ({ row }) => (
					<div className="flex items-center gap-3 h-full">
						<button
							type="button"
							onClick={() => {
								void handleEdit(row);
							}}
							className="text-blue-500 hover:text-blue-700"
						>
							<Pencil size={18} />
						</button>

						<button
							type="button"
							onClick={() => console.log(row)}
							className="text-red-500 hover:text-red-700"
						>
							<Trash2 size={18} />
						</button>
					</div>
				),
			},
		];
	}, [handleEdit]);

	return (
		<>
			{isLoading && <div>Cargando...</div>}

			<div className="border rounded-2xl overflow-hidden">
				<DataGrid
					columns={columns}
					rows={data.data}
					className="rdg-light"
					rowHeight={52}
					headerRowHeight={50}
				/>
			</div>
		</>
	);
}
