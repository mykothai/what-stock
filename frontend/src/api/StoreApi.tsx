import axios, { AxiosResponse } from 'axios'

export async function getInventory(): Promise<AxiosResponse> {
  try {
    return await axios.get('/inventory')
  } catch (err: any) {
    throw err.response
  }
}
