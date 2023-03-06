import { RequestError } from './request-error'
import { token } from './token'

export async function request<T>(
  url: string,
  req: {
    method: string
    body?: string
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
