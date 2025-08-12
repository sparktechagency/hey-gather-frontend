import { url } from '@/redux/main/server'

export async function getVendorById(id: string) {
  try {
    const response = await fetch(`${url}/business-service/get-all?_id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // For dynamic data that changes frequently
      // Alternatively: next: { revalidate: 60 } // For data that changes less frequently
    })

    if (!response.ok) {
      throw new Error('Failed to fetch vendor data')
    }

    const data = await response.json()
    return data.data[0] || null
  } catch (error) {
    console.error('Error fetching vendor data:', error)
    return null
  }
}
