import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ControllerOutput } from './pages/controller-output'
import { ControllerInput } from './pages/controller-input'
import About from './pages/about'
import { Config } from './pages/config'
export const Router: FC<{}> = () => {
	return (
		<Routes>
			<Route path='/' element={<ControllerOutput />} />
			<Route path='/input' element={<ControllerInput />} />
			<Route path='/about' element={<About />} />
			<Route path='/config' element={<Config />} />
		</Routes>
	)
}
