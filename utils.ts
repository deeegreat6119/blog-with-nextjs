export const getFullname = (firstname: string, lastname: string) => {
	return `${firstname} ${lastname}`
}

export const fetcher = (url: string) => fetch(url).then((resp) => resp.json())

export const ENV = (key: string, alt?: string) => (process.env[key] ?? alt) ?? ""