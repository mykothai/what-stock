import axios, { AxiosResponse } from 'axios'

export async function getInventories(): Promise<AxiosResponse> {
  const URL = `/api/store/inventories`
  
  try {
    const response = await axios.get(URL)
    return response.data
    
  } catch (err: any) {
    throw err.response
  }
}