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

	it('renders correctly', () => {
		render(<VolumeSlider {...defaultProps} />)
		expect(screen.getByText('Volume label')).toBeInTheDocument()
		expect(screen.getByText('50%')).toBeInTheDocument()
	})

	it('mute toggle works', () => {
		render(<VolumeSlider {...defaultProps} />)
		fireEvent.click(screen.getByTestId(testid.btnMuteToggle))
		expect(defaultProps.onMuteChange).toHaveBeenCalled()
	})

	describe('volume up button works', () => {
		it('volume up button works', () => {
			render(<VolumeSlider {...defaultProps} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeUp))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([60])
		})
	})

	describe('volume down button works', () => {
		it('decrese volume', () => {
			render(<VolumeSlider {...defaultProps} />)
			fireEvent.click(screen.getByTestId(testid.btnVolumeDown))
			expect(defaultProps.onValueCommit).toHaveBeenCalledWith([40])
		})
	})
})
