import { Pencil, Trash2 } from "lucide-react";
import { DataGrid, type Column } from "react-data-grid";

import type { BackendPaginationResponse } from "@/types/responses";
import "react-data-grid/lib/styles.css";
import type { Persona } from "../persona.types";

const columns: Column<Persona>[] = [
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
					onClick={() => handleEdit(row)}
					className="text-blue-500 hover:text-blue-700"
				>
					<Pencil size={18} />
				</button>

				<button
					onClick={() => handleDelete(row)}
					className="text-red-500 hover:text-red-700"
				>
					<Trash2 size={18} />
				</button>
			</div>
		),
	},
];

const handleEdit = (row: Persona) => {
	console.log("Editar", row);
};

const handleDelete = (row: Persona) => {
	console.log("Eliminar", row);
};

export default function PersonasTable({
	data,
	isLoading,
}: {
	isLoading: boolean;
	data: BackendPaginationResponse<Persona>;
}) {
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
