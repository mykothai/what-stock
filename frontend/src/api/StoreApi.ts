import axios from './index';

export async function getInventories() {
  const URL = `/store/inventories`
  
  try {
    const response = await axios.get(URL)
    return response.data

  } catch (err: any) {
    throw err.response
  }
}