import { renderHook } from '@testing-library/react-hooks'
import { useConfig } from './use-config'
import { act } from 'react'

describe('useConfig', () => {
  test('initial config with defaults', () => {
    const { result } = renderHook(() => useConfig())
    const [defaultConfig] = result.current
    expect(defaultConfig).toEqual({
      hostname: 'localhost',
      port: '8448',
      endpoint: '/api/v1/ws',
      serverUrl: 'ws://localhost:8448/api/v1/ws',
      minVolume: 0,
      maxVolume: 150,
    })
  })

  test('update config port', async () => {
    const { result, rerender } = renderHook(() => useConfig())

    act(() => {
      const [, updateConfig] = result.current
      updateConfig({ port: '9000' })
    })

    rerender()

    const [updatedConfig] = result.current

    expect(updatedConfig).to.eql({
      hostname: 'localhost',
      port: '9000',
      endpoint: '/api/v1/ws',
      serverUrl: 'ws://localhost:9000/api/v1/ws',
      minVolume: 0,
      maxVolume: 150,
    })
  })

  test('update min max volume', async () => {
    const { result, rerender } = renderHook(() => useConfig())

    act(() => {
      const [, updateConfig] = result.current
      updateConfig({ minVolume: 69, maxVolume: 50 })
    })

    rerender()

    const [updatedConfig] = result.current

    expect(updatedConfig).to.eql({
      hostname: 'localhost',
      port: '9000',
      endpoint: '/api/v1/ws',
      serverUrl: 'ws://localhost:9000/api/v1/ws',
      minVolume: 69,
      maxVolume: 50,
    })
  })

  test('falback min and max volume to defaults', async () => {
    const { result, rerender } = renderHook(() => useConfig())

    act(() => {
      const [, updateConfig] = result.current
      updateConfig({ minVolume: -666, maxVolume: 666 })
    })

    rerender()

    const [updatedConfig] = result.current

    expect(updatedConfig).to.eql({
      hostname: 'localhost',
      port: '9000',
      endpoint: '/api/v1/ws',
      serverUrl: 'ws://localhost:9000/api/v1/ws',
      minVolume: 0,
      maxVolume: 250,
    })
  })
})
