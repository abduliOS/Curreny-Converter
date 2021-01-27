import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchCurrencyRate from '@/Services/CurrencyList/CurrencyRates/FetchCurrencyRate'

export default {
  initialState: buildAsyncState('fetchCurrencyRate'),
  action: buildAsyncActions('currency/FetchCurrencyRate', fetchCurrencyRate),
  reducers: buildAsyncReducers({
    errorKey: 'fetchOne.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'fetchOne.loading',
  }),
}
