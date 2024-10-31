import { atom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'
import { useImmerAtom } from 'jotai-immer'
import { useEffect } from 'react'
import type { GetWsMessage, VolStatus } from './types'
import { useWebSocketApi } from './use-web-socket-api'

export const volStatusAtom = atom<VolStatus>()
if (process.env.NODE_ENV !== 'production') {
  volStatusAtom.debugLabel = 'statusAtom'
}

export const useVolumeStatus = () => {
  const [volStatus, updateVolStatus] = useImmerAtom(volStatusAtom)
  useAtomDevtools(volStatusAtom)
  const { lastMessage, sendMessage } = useWebSocketApi()

  // It updates status when backend server broadcasts new state
  useEffect(() => {
    if (lastMessage && typeof lastMessage.data === 'string') {
      const incomeMessage = JSON.parse(lastMessage.data) as GetWsMessage
      updateVolStatus(draft => {
        if (incomeMessage.action === 'GetStatus' && !!incomeMessage.payload) {
          return incomeMessage.payload
        }
        return draft
      })
    }
  }, [lastMessage, updateVolStatus])

  const setSink = (name: string, volume: string) => {
    updateVolStatus(draft => {
      const sink = draft?.outputs.find(s => s.name === name)
      if (sink) {
        sink.volume = volume
      }
    })

    sendMessage({
      action: 'SetSinkVolume',
      payload: { name, volume },
    })

    return { updateVolStatus, sendMessage }
  }

  // Send SetSinkInputVolume message to websocket, when debouncedVolStatus changes
  const setSinkInput = (id: number, volume: string) => {
    updateVolStatus(draft => {
      const sink = draft?.apps.find(s => s.id === id)
      if (sink) {
        sink.id = id
      }
    })

    sendMessage({
      action: 'SetSinkInputVolume',
      payload: { id, volume },
    })

    return { updateVolStatus, sendMessage }
  }

  const toggleSinkMute = (name: string) => {
    updateVolStatus(draft => {
      const sink = draft?.outputs.find(s => s.name === name)
      if (sink) {
        sink.muted = !sink.muted
      }
    })

    sendMessage({
      action: 'SetSinkMuted',
      payload: { name, muted: !volStatus?.outputs.find(s => s.name === name)?.muted },
    })
  }

  const toggleSinkInputMute = (id: number) => {
    sendMessage({
      action: 'SetSinkInputMuted',
      payload: { id, muted: !volStatus?.apps.find(s => s.id === id)?.muted },
    })
  }

  return { getStatus: volStatus, setSink, setSinkInput, toggleSinkMute, toggleSinkInputMute }
}
