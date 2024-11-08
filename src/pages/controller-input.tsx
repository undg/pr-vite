import { useVolumeStatus } from '../api/use-vol-status'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../constant'

export const ControllerInput: React.FC = () => {
	const vol = useVolumeStatus()

	// @TODO (undg) 2024-11-07: finish handlers, when functionality implemented on BE and in hook
	const handleSourceVolumeChange = (_name: string, [_volume]: number[]) => {
		navigator.vibrate([10])
		return { optimistic: () => {}, send: () => {} }
	}

	const handleSourceMuteToggle = (_name: string) => () => {
		navigator.vibrate([10])
	}

	return (
		<Layout header={dict.headerInput}>
			<section className='flex flex-col gap-6 text-xl'>
				{vol.getStatus?.sources?.map(source => (
					<VolumeSlider
						key={source.id}
						muted={source.muted}
						volume={source.volume}
						label={source.label}
						onMuteChange={handleSourceMuteToggle(source.name)}
						onValueChange={volume => handleSourceVolumeChange(source.name, volume).optimistic()}
						onValueCommit={volume => handleSourceVolumeChange(source.name, volume).send()}
					></VolumeSlider>
				))}
			</section>
		</Layout>
	)
}
