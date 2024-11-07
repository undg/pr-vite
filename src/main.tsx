import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { useAtomsDebugValue } from 'jotai-devtools'
import App from './app'

const MAX_RETRIES = 1
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES,
		},
	},
})

function DebugAtoms() {
	useAtomsDebugValue()
	return null
}

const container = document.querySelector('#root')
if (container) {
	const root = createRoot(container)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<DebugAtoms />
				<App />
			</QueryClientProvider>
		</StrictMode>,
	)
}
