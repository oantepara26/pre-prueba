import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

window.onerror = (message: string | Event) => {
	toast.error(
		`Error global: ${
			typeof message === "string" ? message : "Error desconocido"
		}`
	);
	return false;
};

window.onunhandledrejection = (event: PromiseRejectionEvent) => {
	toast.error(`Promesa rechazada: ${event.reason}`);
};

class ErrorBoundary extends Component<{
	children: ReactNode;
}> {
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		toast.error(`Error en UI: ${error.message}`);
		console.error(error, errorInfo);
	}

	render() {
		return this.props.children;
	}
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
				<Toaster position="top-right" richColors />
			</>
		</QueryClientProvider>
	</StrictMode>
);
