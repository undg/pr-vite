export const MIN_VOLUME = 0
/**
 * Max volume 150 is 150%. Although you can set it as loud as you like,
 * value above 200 (200%) can damage your speakers.
 */
export const MAX_VOLUME = 250

export const testid = {
	gotoOutputDevices: 'goto-output-devices',
	gotoInputDevices: 'goto-input-devices',
	gotoAbout: 'goto-about',
	gotoConfig: 'goto-config',
	btnTheme: 'btn-theme',
	btnMuteToggle: 'btn-mute-toggle',
	loadingOrError: 'loading-or-error',
	inputMinVolume: 'input-min-volume',
	inputMaxVolume: 'input-max-volume',
	inputHostname: 'input-hostname',
	inputPort: 'input-port',
	inputEndpoint: 'input-endpoint',
	inputFullUrl: 'input-full-url',
	btnReset: 'input-reset',
	btnDetect: 'input-detect',
} as const
