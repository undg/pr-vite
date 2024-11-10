import { z } from 'zod'
import { MAX_VOLUME, MIN_VOLUME } from '../constant'

// @TODO (undg) 2024-09-15: I need  two schemas. One for throwing errors, second for UI errors.

export const ConfigSchema = z
	.object({
		minVolume: z.number().min(MIN_VOLUME).max(MAX_VOLUME).catch(MIN_VOLUME),
		maxVolume: z.number().max(MAX_VOLUME).catch(MAX_VOLUME),
		stepVolume: z.number().catch(10),
		hostname: z.string().describe('Server host address').optional(),
		port: z
			.string()
			.regex(/^\d+$/, { message: 'Port must be a number' })
			.refine(
				val => {
					const num = parseInt(val, 10)
					return num >= 1 && num <= 65535
				},
				{ message: 'Port must be between 1 and 65535' },
			)
			.optional()
			.describe('Valid port between 1 and 65535'),
		endpoint: z.string().startsWith('/').describe('API endpoint path starting with /'),
		serverUrl: z.string().optional().describe('Full server URL. Do not edit directly.'),
	})
	.transform(({ hostname, port, endpoint, maxVolume, minVolume, stepVolume }) => ({
		/** Min volume for slider, default 0 */
		minVolume,
		/** Max volume for slider, default 150 */
		maxVolume,
		/** Step volume for slider, default 10 */
		stepVolume,
		/** Host address for the server */
		hostname,
		/** Port number for the server */
		port,
		/** API endpoint path */
		endpoint,
		/** Full server URL. Automatically generated. Do not edit directly. */
		serverUrl: `ws://${hostname}:${port}${endpoint}`,
	}))

export type Config = z.infer<typeof ConfigSchema>
