import { MinusCircleIcon, PlusCircleIcon, Volume, VolumeOff } from 'lucide-react'
import { testid } from '../constant'
import { Button } from '../primitives/button'
import { Slider } from '../primitives/slider'
import { Toggle } from '../primitives/toggle'
import { Small } from '../primitives/typography'
import { cn } from '../utils/cn'
import { useConfig } from '../config/use-config'

export const VolumeSlider: React.FC<{
	children?: React.ReactNode
	className?: string
	muted: boolean
	label: string
	volume: number
	onMuteChange?: React.MouseEventHandler<HTMLButtonElement> | undefined
	onValueChange?: (value: number[]) => void
	onValueCommit?: (value: number[]) => void
}> = props => {
	const [config] = useConfig()
	const handleVolumeDown = () => {
		const volume = props.volume
		if (volume === config.minVolume) {
			return
		}

		let newVolume = volume - config.stepVolume

		if (volume < config.minVolume) {
			newVolume = config.minVolume
		}

		if (volume < config.stepVolume) {
			newVolume = config.minVolume
		}

		if (volume > config.maxVolume) {
			newVolume = config.maxVolume
		}

		props.onValueChange?.([newVolume])
		props.onValueCommit?.([newVolume])
	}

	const handleVolumeUp = () => {
		const volume = props.volume
		if (volume === config.maxVolume) {
			return
		}

		let newVolume = volume + config.stepVolume

		if (volume > config.maxVolume - config.stepVolume) {
			newVolume = config.maxVolume
		}

		if (volume < config.minVolume) {
			newVolume = config.minVolume
		}

		props.onValueChange?.([newVolume])
		props.onValueCommit?.([newVolume])
	}

	return (
		<div
			className={cn('grid items-center gap-x-4 gap-y-0', props.className)}
			style={{ gridTemplateColumns: '2em auto', gridTemplateRows: 'repeat(1em)' }}
		>
			<Toggle
				variant='outline'
				size='sm'
				pressed={props.muted}
				data-testid={testid.btnMuteToggle}
				onClick={props.onMuteChange}
			>
				{props.muted ? <VolumeOff color='red' /> : <Volume />}
			</Toggle>
			<Small className='self-end truncate text-right text-xs'>{props.label}</Small>
			<div className='col-span-2 flex'>
				<Button data-testid={testid.btnVolumeDown} variant={`ghost`} size='icon' onClick={handleVolumeDown}>
					<MinusCircleIcon />
				</Button>
				<Slider
					className='top-2 col-span-1 mb-4'
					thumbContent={
						<span
							className={cn(
								'text-xs text-green-500',
								props.volume >= 75 && 'text-orange-500',
								props.volume >= 100 && 'text-red-500',
							)}
						>
							{props.volume}%
						</span>
					}
					name={props.label}
					title={props.label}
					min={config.minVolume}
					max={config.maxVolume}
					value={[props.volume]}
					step={1}
					onValueChange={props.onValueChange}
					onValueCommit={props.onValueCommit}
				/>
				<Button data-testid={testid.btnVolumeUp} variant={`ghost`} size='icon' onClick={handleVolumeUp}>
					<PlusCircleIcon />
				</Button>
			</div>
			{props.children}
		</div>
	)
}
