import { RequestError } from './request-error'
import { token } from './token'

export async function request<T>(
  url: string,
  req: {
    method: string
    body?: string | FormData
    headers: { [key: string]: string }
  },
  // ignoredStatuses: number[] = [],
): Promise<T | undefined> {
  return await fetch(url, req)
    .then((res) => {
      if (!res.ok) {
        throw new RequestError(res.status, res.statusText)
      }
      return res.json() as Promise<T>
    })
}

export async function getUnauth<T>(
  url: string,
  // ignoredStatuses: number[] = [],
): Promise<T | undefined> {
  return await request(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    // ignoredStatuses,
  )
}

export async function postUnauth<T>(
  url: string,
  body: object,
  // ignoredStatuses: number[] = [],
): Promise<T | undefined> {
  return await request<T>(
    url,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    // ignoredStatuses,
  )
}

export async function get<T>(url: string,
  // ignoredStatuses: number[] = []
): Promise<T | undefined> {
  return await request<T>(
    url,
    {
      method: 'GET',
      headers: { authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    },
    // ignoredStatuses,
  )
}

export async function post<T>(
  url: string,
  body: object,
  // ignoredStatuses: number[] = [],
): Promise<T | undefined> {
  return await request<T>(
    url,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    // ignoredStatuses,
  )
}

export async function postFormData<T>(
  url: string,
  body: FormData,
): Promise<T | undefined> {
  return await request<T>(
    url,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${token()}` },
      body
    },
  )
}

export async function upload(
  url: string,
  file: File,
  // ignoredStatuses: number[] = [],
): Promise<any> {
  const data = new FormData()
  data.append('file', file)
  return await fetch(url, { // Your POST endpoint
    method: 'POST',
    headers: {
      authorization: `Bearer ${token()}`,
    },
    body: data
  }).then(
    response => response.json() // if the response is a JSON object
  ).then(
    success => {
      console.log(success)
      return success
    }
  ).catch(
    error => {
      console.log(error)
      throw error
    } // Handle the error response object
  )
}

export async function putRequest<T>(
  url: string,
  body: object,
  // ignoredStatuses: number[] = [],
): Promise<T | undefined> {
  return await request<T>(
    url,
    {
      method: 'PUT',
      headers: { authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    // ignoredStatuses,
  )
}

export async function del(url: string,
  // ignoredStatuses: number[] = []
): Promise<void> {
  await request(
    url,
    {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    },
    // ignoredStatuses,
  )
}
