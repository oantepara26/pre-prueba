// src/pages/personas/PersonasPage.tsx

import axios from "axios";
import { Pencil, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DataGrid, type Column } from "react-data-grid";

import "react-data-grid/lib/styles.css";
import HeaderPage from "../../components/HeaderPage";
import HeaderPageActions from "./components/HeaderPageActions";
import SearchInput from "@/components/SearchInput";

type TipoPersona = "Proveedor" | "Cliente" | "Empleado";

interface Persona {
  id: number;
  identificacion: string;
  tipoDocumento: string;
  nombre: string;
  email: string;
  telefono: string;
  tipo: TipoPersona;
}

const columns: Column<Persona>[] = [
  {
    key: "identificacion",
    name: "IDENTIFICACIÓN",
    resizable: true,
    width: 170,
  },
  {
    key: "tipoDocumento",
    name: "TIPO DE DOCUMENTO",
    resizable: true,
    width: 170,
  },
  {
    key: "nombre",
    name: "NOMBRE / RAZÓN SOCIAL",
    resizable: true,
    width: 350,
  },
  {
    key: "email",
    name: "EMAIL",
    resizable: true,
    width: 220,
  },
  {
    key: "telefono",
    name: "TELÉFONO",
    resizable: true,
    width: 170,
  },
  {
    key: "tipo",
    name: "TIPOS",
    width: 160,
    renderCell: ({ row }) => (
      <div className="flex items-center h-full">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            row.tipo === "Proveedor"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : row.tipo === "Cliente"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-violet-50 text-violet-600 border-violet-200"
          }`}
        >
          {row.tipo}
        </span>
      </div>
    ),
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

export default function PersonasPage() {
  const [rows, setRows] = useState<Persona[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPersonas = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );

      const data: Persona[] = response.data.map(
        (item: Persona, index: number) => ({
          id: item.id,
          identificacion: `091${index + 1}593508400`,
          tipoDocumento: index % 2 === 0 ? "ruc" : "cédula",
          nombre: item.nombre.toUpperCase(),
          email: item.email,
          telefono: item.telefono,
          tipo: "Empleado",
        }),
      );

      setRows(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPersonas();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((item) =>
      item.nombre.toLowerCase().includes(search.toLowerCase()),
    );
  }, [rows, search]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <HeaderPage title="Personas" icon={Users} color="green">
          <HeaderPageActions />
        </HeaderPage>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <SearchInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onFinish={(value) => {
                console.log(value);
              }}
            />
            <button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition">
              <Plus size={20} />
              Nuevo Registro
            </button>
          </div>

          <div className="border rounded-2xl overflow-hidden">
            <DataGrid
              columns={columns}
              rows={filteredRows}
              className="rdg-light min-h-[600px]"
              rowHeight={52}
              headerRowHeight={50}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-5 text-sm text-slate-600">
            <span>
              Mostrando <strong>1 a {filteredRows.length}</strong> de{" "}
              <strong>{rows.length}</strong> registros
            </span>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-lg border hover:bg-slate-50">
                Previous
              </button>

              <button className="w-10 h-10 rounded-lg bg-blue-600 text-white">
                1
              </button>

              <button className="w-10 h-10 rounded-lg hover:bg-slate-100">
                2
              </button>

              <span className="px-2">...</span>

              <button className="w-10 h-10 rounded-lg hover:bg-slate-100">
                10
              </button>

              <button className="px-3 py-2 rounded-lg border hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
