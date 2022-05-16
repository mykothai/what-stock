import axios from 'axios'

export async function getInventories() {
    const URL = `/inventories`
    try {
      const response = await axios.get(URL)
      return response.data
    } catch (err: any) {
      throw err.response
    }
}