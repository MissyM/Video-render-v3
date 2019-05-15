
export const isProduction = process.env.NODE_ENV === 'production'

export const serverURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export const getVideo = resource => `${serverURL}/api/video/${resource.id}.${resource.src}`

export const getPDF = resource => `${serverURL}/api/pdf/${resource.id}.${resource.src}`

export const getThumbnails = resource => `${serverURL}/api/thumbnails/${resource.id}.${resource.img}`

export const getContent = () =>
  fetch(`${serverURL}/api/content`)
    .then(r => r.json())

export const log = logObject => {
  fetch(`${serverURL}/api/log`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logObject),
  })
}

export const login = data =>
  fetch(`${serverURL}/api/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const register = data =>
  fetch(`${serverURL}/api/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(r => r.json())
