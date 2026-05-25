import type { BackendPaginationResponse } from "@/types/responses";

export function createEmptyPaginationResponse<T>(
	perPage = 10,
	data: T[] = []
): BackendPaginationResponse<T> {
	return {
		success: true,

		data,

		links: {
			first: null,
			last: null,
			prev: null,
			next: null,
		},

		meta: {
			current_page: 1,
			from: 0,
			last_page: 1,
			links: [],
			path: "",
			per_page: perPage,
			to: 0,
			total: 0,
		},
	};
}
