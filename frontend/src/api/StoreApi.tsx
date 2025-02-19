import axios, { AxiosResponse } from 'axios'
import instance from './axiosConfig'

export async function getInventory(): Promise<AxiosResponse> {
  try {
    return await instance.get('/inventory')
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error fetching inventory. ${err}`)
    }
  }
}
