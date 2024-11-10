import { render, fireEvent, screen } from '@testing-library/react'
import { VolumeSlider } from './volume-slider'
import { testid } from '../constant'

describe('<VolumeSlider />', () => {
	const defaultProps = {
		muted: false,
		label: 'Volume label',
		volume: 50,
		onMuteChange: vi.fn(),
		onValueChange: vi.fn(),
		onValueCommit: vi.fn(),
	}

	test('renders correctly', () => {
		render(<VolumeSlider {...defaultProps} />)
		expect(screen.getByText('Volume label')).toBeInTheDocument()
		expect(screen.getByText('50%')).toBeInTheDocument()
	})

	test('mute toggle works', () => {
		render(<VolumeSlider {...defaultProps} />)
		fireEvent.click(screen.getByTestId(testid.btnMuteToggle))
		expect(defaultProps.onMuteChange).toHaveBeenCalled()
	})

	test('volume up button works', () => {
		render(<VolumeSlider {...defaultProps} />)
		fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
		expect(defaultProps.onValueCommit).toHaveBeenCalledWith([60])
	})

	test('volume down button works', () => {
		render(<VolumeSlider {...defaultProps} />)
		fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
		expect(defaultProps.onValueCommit).toHaveBeenCalledWith([40])
	})
})
