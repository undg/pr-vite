import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingOrError from './components/loading-or-error'
import About from './pages/about'
import { Config } from './pages/config'
import { ControllerOutput } from './pages/controller-output'
import { ControllerInput } from './pages/controller-input'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<ControllerOutput />} />
					<Route path='/input' element={<ControllerInput />} />
					<Route path='/about' element={<About />} />
					<Route path='/config' element={<Config />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
