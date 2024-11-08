import { PrapiStatus } from '../generated/status'

// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.
type ActionIn = 'GetStatus' | 'GetSinks' | 'GetCards' | 'GetSchema' | 'GetBuildInfo' | 'GetOutputs'
// And more

export type GetWsMessage = {
	action: ActionIn
	status: number // 400x
	payload?: PrapiStatus
	error?: string
}

export type Message =
	| {
			action: 'SetSinkVolume'
			payload: { name: string; volume: number }
	  }
	| {
			action: 'SetSinkMuted'
			payload: { name: string; muted: boolean }
	  }
	| {
			action: 'SetSinkInputVolume'
			payload: { id: number; volume: number }
	  }
	| {
			action: 'SetSinkInputMuted'
			payload: { id: number; muted: boolean }
	  }
	| { action: 'GetStatus' }
