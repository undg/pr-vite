export interface PrapiMessage {
	/**
	 * Action to perform fe. GetVolume, SetVolume, SetMute...
	 */
	action: string
	/**
	 * Paylod send with Set* actions if necessary
	 */
	payload?: any
}
