import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '@/Providers/AuthProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'
import { StatusBar } from 'expo-status-bar'

const queryClient = new QueryClient()
export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</AuthProvider>
			<StatusBar style='light' />
		</QueryClientProvider>
	)
}
