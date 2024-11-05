import type { FC } from 'react'
import { useVolumeStatus } from '../../api/use-vol-status'
import { H3, Muted, Small } from '../../primitives/typography'

export const ServerInfo: FC = () => {
  const { getStatus: volStatus } = useVolumeStatus()

  return (
    <section>
      <H3>Server info</H3>
      <div className='grid grid-cols-2 gap-2'>
        <div className='flex flex-col'>
          <Muted>Version</Muted>
          <Small>{volStatus?.buildInfo.gitVersion}</Small>
        </div>
        <div className='flex flex-col'>
          <Muted>Commit SHA</Muted>
          <Small>{volStatus?.buildInfo.gitCommit}</Small>
        </div>
        <div className='flex flex-col'>
          <Muted>Platform</Muted>
          <Small>{volStatus?.buildInfo.platform}</Small>
        </div>
        <div className='flex flex-col'>
          <Muted>Build Date</Muted>
          <Small>{volStatus?.buildInfo.buildDate}</Small>
        </div>
        <div className='flex flex-col'>
          <Muted>Go Version</Muted>
          <Small>{volStatus?.buildInfo.goVersion}</Small>
        </div>
        <div className='flex flex-col'>
          <Muted>Compiler</Muted>
          <Small>{volStatus?.buildInfo.compiler}</Small>
        </div>
      </div>
    </section>
  )
}
