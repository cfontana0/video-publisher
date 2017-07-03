export const http = (config) => {
  const q = new Promise((resolve, reject) => {
    const headers = new Headers({'Content-Type': 'application/json'})

    let requestStatus
    let data = {
      method: config.method || 'GET',
      headers: headers,
      body: (config.method && config.method !== 'GET' && config.method !== 'HEAD' && config.body && JSON.stringify(config.body)),
    }

    if (config.mode) {
      data.mode = config.mode;
    }

    if (data.method === 'HEAD' || data.method === 'GET') {
      delete data.body
    }

    const request = new Request(config.url, data)

    fetch(request).then((response) => {
      requestStatus = response.status
      if (config.method === "DELETE") {
        return {}
      } else {
        if (!config.mode) return response.json()
        else {
          return {}
        }
      }
    })
    .then((body) => {
      resolve({status: requestStatus, body})
    }).catch((e) => {
      reject(e)
    })
  })
  return q
}
