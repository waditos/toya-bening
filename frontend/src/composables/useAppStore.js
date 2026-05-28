import { reactive } from 'vue'

const state = reactive({
  pelangganId: '',
  pelanggan: null,
  meterBaru: '',
  fotoBase64: '',
  latitude: null,
  longitude: null,
  tanggal: '',
  submitResult: null,
  loading: false,
  error: '',
})

export function useAppStore() {
  function reset() {
    state.pelangganId = ''
    state.pelanggan = null
    state.meterBaru = ''
    state.fotoBase64 = ''
    state.latitude = null
    state.longitude = null
    state.tanggal = ''
    state.submitResult = null
    state.loading = false
    state.error = ''
  }

  return { state, reset }
}
