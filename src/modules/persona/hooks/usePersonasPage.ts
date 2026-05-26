import { useQuery } from "@tanstack/react-query";
import { usePersonasPageStore } from "../persona.store";
import { fetchPersonas } from "../personas.api";
import type { Persona } from "../persona.types";
import { createEmptyPaginationResponse } from "@/lib/helpers";
import useDebounce from "@/hooks/useDebounce";
import { useShallow } from "zustand/react/shallow";
export function usePersonasPage() {
	const storeControls = usePersonasPageStore(
		useShallow((state) => ({
			page: state.page,
			perPage: state.perPage,
			search: state.search,
			setPage: state.setPage,
			setPerPage: state.setPerPage,
			setSearch: state.setSearch,
			showPersonaModal: state.showPersonaModal,
			setShowPersonaModal: state.setShowPersonaModal,
			formData: state.formData,
			setFormData: state.setFormData,
			resetFormData: state.resetFormData,
			isSubmittingForm: state.isSubmittingForm,
			setIsSubmittingForm: state.setIsSubmittingForm,
			isEditingPersona: state.isEditingPersona,
			setIsEditingPersona: state.setIsEditingPersona,
		}))
	);

	const debouncedSearch = useDebounce(storeControls.search, 500);

	const query = useQuery({
		queryKey: [
			"users",
			storeControls.page,
			storeControls.perPage,
			debouncedSearch,
		],

		queryFn: () =>
			fetchPersonas({
				page: storeControls.page,
				perPage: storeControls.perPage,
				search: debouncedSearch,
			}),

		placeholderData: createEmptyPaginationResponse<Persona>(
			storeControls.perPage
		),

		staleTime: 0,
	});

	return {
		data: query?.data,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		error: query.error,
		refetch: query.refetch,
		...storeControls,
	};
}
