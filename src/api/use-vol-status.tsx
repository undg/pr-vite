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
    function optimistic() {
      updateVolStatus(draft => {
        const sink = draft?.outputs.find(s => s.name === name)
        if (sink) {
          sink.volume = volume
        }
      })
    }

    function send() {
      sendMessage({
        action: 'SetSinkVolume',
        payload: { name, volume },
      })
    }

    return {
      optimistic,
      send,
    }
  }

  const setSinkInput = (id: number, volume: string) => {
    function optimistic() {
      updateVolStatus(draft => {
        const sink = draft?.apps.find(s => s.id === id)
        console.log(id)
        if (sink) {
          sink.volume = volume
        }
      })
    }

    function send() {
      sendMessage({
        action: 'SetSinkInputVolume',
        payload: { id, volume },
      })
    }

    return {
      optimistic,
      send,
    }
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
