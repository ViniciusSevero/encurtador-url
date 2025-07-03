export class ShortenedUrlAlreadyExists extends Error {
	constructor() {
		super('Shortened Url already Exists.')
	}
}
