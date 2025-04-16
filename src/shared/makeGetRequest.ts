type makeGetRequestParams = {
    url: string
    callback: (data: any) => void
}

export async function makeGetRequest({ url, callback }: makeGetRequestParams) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error with code ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            callback(data)
        })
}
