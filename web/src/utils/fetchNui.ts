import type { NuiResponse } from '../types/protocol'

export async function fetchNui<T = unknown>(
  action: string,
  data: unknown = {},
): Promise<NuiResponse<T>> {
  const resourceName =
    (window as unknown as { GetParentResourceName?: () => string })
      .GetParentResourceName?.() ?? 'roby_keybinds'

  const resp = await fetch(`https://${resourceName}/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  })

  return resp.json() as Promise<NuiResponse<T>>
}
