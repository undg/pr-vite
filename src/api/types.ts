// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.

type ActionIn = 'GetStatus' | 'GetSinks' | 'GetCards' | 'GetSchema' | 'GetBuildInfo' | 'GetOutputs'
// And more

type Outputs = {
  /** Uniq device index */
  id: number
  /** Uniq name, can be used as ID */
  name: string
  label: string
  /** Volume is a number string, percent */
  volume: string
  muted: boolean
}

type Apps = {
  /** Uniq app index */
  id: number
  /** Uniq Outputs.id that can be used to corelate app with output */
  outputId: number
  label: string
  /** Volume is a number string, percent */
  volume: string
  muted: boolean
}

type BuildInfo = {
  gitVersion: string
  gitCommit: string
  buildDate: string
  goVersion: string
  compiler: string
  platform: string
}

export type VolStatus = {
  outputs: Outputs[]
  apps: Apps[]
  /** Backend server metadata */
  buildInfo: BuildInfo
}

export type GetSinks = {
  /** Uniq name, can be used as ID */
  name: string
  label: string
  /** Volume is a number string */
  volume: string
  muted: boolean
}

export type GetWsMessage = {
  action: ActionIn
  status: number // 400x
  payload?: VolStatus
  error?: string
}

export type Message =
  | {
      action: 'SetSinkVolume'
      payload: { name: string; volume: string }
    }
  | {
      action: 'SetSinkMuted'
      payload: { name: string; muted: boolean }
    }
  | {
      action: 'SetSinkInputVolume'
      payload: { id: number; volume: string }
    }
  | {
      action: 'SetSinkInputMuted'
      payload: { id: number; muted: boolean }
    }
  | { action: 'GetStatus' }
