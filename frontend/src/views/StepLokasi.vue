<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    </div>
    <h2 class="step-title">Lokasi GPS</h2>
    <p class="step-desc">Mendapatkan lokasi meter secara otomatis</p>

    <div class="step-body">
      <div v-if="error" class="error-msg">{{ error }}</div>

      <div :class="['gps-status', gpsStatus]">
        <template v-if="gpsStatus === 'loading'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
          Mendapatkan lokasi...
        </template>
        <template v-else-if="gpsStatus === 'success'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Lokasi berhasil didapatkan
        </template>
        <template v-else>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          Gagal mendapatkan lokasi
        </template>
      </div>

      <div v-if="state.latitude" class="info-card">
        <div class="info-row">
          <span class="info-label">Latitude</span>
          <span class="info-value">{{ state.latitude }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Longitude</span>
          <span class="info-value">{{ state.longitude }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Akurasi</span>
          <span class="info-value">{{ akurasi }} meter</span>
        </div>
      </div>

      <div v-if="gpsStatus === 'error'" style="margin-top:12px;">
        <label class="form-label">Atau masukkan koordinat manual:</label>
        <div style="display:flex;gap:8px;">
          <input v-model="manualLat" class="form-input" placeholder="Latitude" type="number" step="any" style="flex:1;" />
          <input v-model="manualLng" class="form-input" placeholder="Longitude" type="number" step="any" style="flex:1;" />
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-outline" @click="kembali">Kembali</button>
      <button class="btn btn-primary" :disabled="!bisaLanjut" @click="lanjut">
        {{ gpsStatus === 'loading' ? 'Mencari...' : 'Lanjut' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../composables/useAppStore.js'

const router = useRouter()
const { state } = useAppStore()

const gpsStatus = ref('loading')
const akurasi = ref(0)
const error = ref('')
const manualLat = ref('')
const manualLng = ref('')
let watchId = null

const bisaLanjut = computed(() => {
  return state.latitude || (manualLat.value && manualLng.value)
})

onMounted(() => {
  if (state.latitude) {
    gpsStatus.value = 'success'
    return
  }

  if (!navigator.geolocation) {
    gpsStatus.value = 'error'
    error.value = 'GPS tidak didukung oleh perangkat ini'
    return
  }

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      state.latitude = pos.coords.latitude
      state.longitude = pos.coords.longitude
      akurasi.value = Math.round(pos.coords.accuracy)
      gpsStatus.value = 'success'
    },
    (err) => {
      gpsStatus.value = 'error'
      switch (err.code) {
        case err.PERMISSION_DENIED:
          error.value = 'Izin lokasi ditolak. Aktifkan GPS di pengaturan browser.'
          break
        case err.TIMEOUT:
          error.value = 'Waktu mendapatkan lokasi habis. Coba lagi atau masukkan manual.'
          break
        default:
          error.value = 'Gagal mendapatkan lokasi. Masukkan koordinat manual.'
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  )
})

function lanjut() {
  if (manualLat.value && manualLng.value) {
    state.latitude = parseFloat(manualLat.value)
    state.longitude = parseFloat(manualLng.value)
  }
  if (!bisaLanjut.value) return
  router.push('/konfirmasi')
}

function kembali() {
  router.push('/meter')
}

onBeforeUnmount(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
})
</script>
