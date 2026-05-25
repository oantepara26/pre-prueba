export interface LaravelLink {
	url: string | null;
	label: string;
	active: boolean;
}

export interface BackendError {
	code: string;
	message: string;
}

export interface BackendPaginationResponse<T> {
	success: boolean;
	error?: BackendError;

	data: T[];

	links: {
		first: string | null;
		last: string | null;
		prev: string | null;
		next: string | null;
	};

	meta: {
		current_page: number;
		from: number;
		last_page: number;
		links: LaravelLink[];
		path: string;
		per_page: number;
		to: number;
		total: number;
	};
}

export interface BackendResponse<T> {
	success: boolean;
	data: T | null;
	error?: BackendError;
	meta?: Record<string, unknown>;
}
