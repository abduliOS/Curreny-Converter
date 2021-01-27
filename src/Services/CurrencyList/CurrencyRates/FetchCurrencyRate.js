import api, { handleError } from '@/Services/CurrencyList'

export default async (userId) => {
  if (!userId) {
    return handleError({ message: 'List failed' })
  }
  const response = await api.get('')
  console.log("CurrencyGet------------>",response);
  return response.data
}
