import { act, renderHook } from '@testing-library/react-hooks'
import { useConfig } from './use-config'

describe('useConfig', () => {
  test('initial config with defaults', () => {
    const { result } = renderHook(() => useConfig())
    const [defaultConfig] = result.current
    expect(defaultConfig).toEqual({
      hostname: 'localhost',
      port: '8448',
      endpoint: '/api/v1/ws',
      serverUrl: 'ws://localhost:8448/api/v1/ws',
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
    })
  })
})
