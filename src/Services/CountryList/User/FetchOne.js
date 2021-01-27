import api, { handleError } from '@/Services/CountryList'

export default async (userId) => {
  if (!userId) {
    return handleError({ message: 'User ID is required' })
  }
  const response = await api.get('')
  console.log("Currency List------------>",response);
  return response.data
}
