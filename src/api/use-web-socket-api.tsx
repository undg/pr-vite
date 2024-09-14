import { WEBSOCKET_URL } from 'constant'
import { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const connectionStatus = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
} as const

type ConnectionStatus = (typeof connectionStatus)[keyof typeof connectionStatus]

export const useWebSocketApi = () => {
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([])
  const [status, setStatus] = useState<ConnectionStatus>('Closed')

  const {
    lastMessage,
    readyState,
    sendMessage: sendMessageWs,
  } = useWebSocket(WEBSOCKET_URL, {
    shouldReconnect: () => true,
    reconnectInterval: 1000,
  })

  useEffect(() => {
    if (lastMessage) {
      setMessageHistory(prev => [...prev, lastMessage])
    }
  }, [lastMessage])

  useEffect(() => {
    setStatus(connectionStatus[readyState])
  }, [readyState])

  const sendMessage = useCallback((message: string) => sendMessageWs(message), [sendMessageWs])

  return { messageHistory, sendMessage, status, lastMessage }
}
