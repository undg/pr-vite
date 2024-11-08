export interface PrapiResponse {
	/**
	 * Action performed by API
	 */
	action: string
	/**
	 * Error description if any
	 */
	error?: string
	/**
	 * Response payload
	 */
	payload: any
	/**
	 * Status code
	 */
	status: number
}
