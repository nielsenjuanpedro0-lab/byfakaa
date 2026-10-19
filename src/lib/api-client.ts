const TIMEOUT_MS = 15_000

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** GET a JSON document. Network, HTTP and parse failures all surface as ApiError. */
export async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const timeout = AbortSignal.timeout(TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ApiError(timeout.aborted ? 'La API tardó demasiado en responder' : 'No se pudo conectar con la API')
  }
  if (!response.ok) throw new ApiError(`La API respondió con error ${response.status}`, response.status)
  try {
    return await response.json()
  } catch {
    throw new ApiError('La API devolvió una respuesta que no es JSON')
  }
}
