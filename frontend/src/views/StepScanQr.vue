<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/><rect x="7" y="7" width="10" height="10"/></svg>
    </div>
    <h2 class="step-title">Scan QR Pelanggan</h2>
    <p class="step-desc">Arahkan kamera ke QR code ID pelanggan</p>

    <div class="step-body">
      <div v-if="error" class="error-msg">{{ error }}</div>

      <div class="scanner-container">
        <QrcodeStream
          v-if="!error"
          :style="'width:100%;height:100%'"
          @detect="onDetect"
          @error="onError"
        />
        <div class="scanner-overlay"></div>
        <div v-if="scanning" class="scanner-active">
          <div class="loading-dots"><span></span><span></span><span></span></div>
          <p style="margin-top:8px;">Memproses QR...</p>
        </div>
      </div>

      <p style="text-align:center;margin-top:12px;font-size:12px;color:var(--text-secondary);">
        Pastikan QR code berada di dalam kotak
      </p>

      <div style="margin-top:auto;">
        <button
          v-if="manualId"
          class="btn btn-outline"
          @click="cariManual"
          style="margin-top:8px;"
        >
          Atau masukkan ID manual
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useAppStore } from '../composables/useAppStore.js'

const router = useRouter()
const { state } = useAppStore()

const error = ref('')
const scanning = ref(false)
const manualId = ref('')

function onDetect(detectedCodes) {
  if (scanning.value) return
  scanning.value = true

  const code = detectedCodes[0]?.rawValue
  if (code) {
    state.pelangganId = code.trim()
    router.push('/pelanggan')
  } else {
    error.value = 'QR tidak terbaca, coba lagi'
    scanning.value = false
  }
}

function onError(err) {
  if (err.name === 'NotAllowedError') {
    error.value = 'Izin kamera diperlukan. Izinkan akses kamera di pengaturan browser.'
  } else if (err.name === 'NotFoundError' || err.message?.includes('NotFound')) {
    error.value = 'Kamera tidak ditemukan. Masukkan ID pelanggan secara manual.'
  } else {
    error.value = 'Kamera tidak tersedia. Masukkan ID pelanggan manual.'
  }
}

function cariManual() {
  const id = prompt('Masukkan ID Pelanggan:')
  if (id && id.trim()) {
    state.pelangganId = id.trim()
    router.push('/pelanggan')
  }
}
</script>
