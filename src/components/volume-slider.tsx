import { MinusCircleIcon, PlusCircleIcon, Volume, VolumeOff } from 'lucide-react'
import { MAX_VOLUME, MIN_VOLUME, testid } from '../constant'
import { Button } from '../primitives/button'
import { Slider } from '../primitives/slider'
import { Toggle } from '../primitives/toggle'
import { Small } from '../primitives/typography'
import { cn } from '../utils/cn'

export const VolumeSlider: React.FC<{
  children?: React.ReactNode
  className?: string
  muted: boolean
  label: string
  volume: string
  onMuteChange?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
}> = props => {
  const handleVolumeDown = () => {
    const volume = Number(props.volume)
    if (volume === MIN_VOLUME) {
      return
    }

    const newVolume = volume < 10 ? MIN_VOLUME : volume - 10

    props.onValueChange?.([newVolume])
    props.onValueCommit?.([newVolume])
  }

  const handleVolumeUp = () => {
    const volume = Number(props.volume)
    if (volume === MAX_VOLUME) {
      return
    }

    const newVolume = volume > 140 ? MAX_VOLUME : volume + 10

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
      <div
        className={cn(
          'text-green-500',
          Number(props.volume) >= 75 && 'text-orange-500',
          Number(props.volume) >= 100 && 'text-red-500',
        )}
      >
        {props.volume}%
      </div>
      <div className='flex'>
        <Button variant={`ghost`} onClick={handleVolumeDown}>
          <MinusCircleIcon />
        </Button>
        <Slider
          className='top-2 col-span-1 mb-4'
          name={props.label}
          title={props.label}
          min={MIN_VOLUME}
          max={MAX_VOLUME}
          value={[Number(props.volume)]}
          step={1}
          onValueChange={props.onValueChange}
          onValueCommit={props.onValueCommit}
        />
        <Button variant={`ghost`} onClick={handleVolumeUp}>
          <PlusCircleIcon />
        </Button>
      </div>
      {props.children}
    </div>
  )
}
