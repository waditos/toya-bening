<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M8 12h8M12 8v8"/></svg>
    </div>
    <h2 class="step-title">Input Meter & Foto</h2>
    <p class="step-desc">Masukkan angka meteran dan foto meter</p>

    <div class="step-body">
      <div v-if="error" class="error-msg">{{ error }}</div>
      <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>

      <video
        v-if="showCamera && !state.fotoBase64"
        ref="videoRef"
        class="camera-preview"
        autoplay
        playsinline
      ></video>

      <div v-if="state.fotoBase64" class="photo-preview">
        <img :src="state.fotoBase64" style="width:100%;height:100%;object-fit:contain;border-radius:12px;" />
      </div>

      <div class="btn-group" style="margin-bottom:12px;">
        <button
          v-if="!state.fotoBase64 && !cameraError"
          class="btn btn-outline"
          @click="showCamera ? ambilFoto() : bukaKamera()"
        >
          {{ showCamera ? 'Ambil Foto' : 'Buka Kamera' }}
        </button>
        <button
          v-if="state.fotoBase64"
          class="btn btn-outline"
          @click="ulangFoto"
        >
          Ulang Foto
        </button>
      </div>

      <div v-if="cameraError" class="error-msg">{{ cameraError }}</div>

      <div v-if="!state.fotoBase64 && !showCamera" style="margin-bottom:12px;">
        <label class="btn btn-outline" style="cursor:pointer;">
          Pilih dari Galeri
          <input type="file" accept="image/*" capture="environment" style="display:none;" @change="pilihGaleri" />
        </label>
      </div>

      <div class="form-group">
        <label class="form-label">Angka Meteran (m³)</label>
        <input
          v-model="meterInput"
          type="number"
          step="0.001"
          min="0"
          class="form-input"
          placeholder="Contoh: 123.456"
          inputmode="decimal"
          autocomplete="off"
        />
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-outline" @click="kembali">Kembali</button>
      <button class="btn btn-primary" :disabled="!bisaLanjut" @click="lanjut">
        {{ loadingFoto ? 'Memproses...' : 'Lanjut' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../composables/useAppStore.js'
import { useCamera } from '../composables/useCamera.js'

const router = useRouter()
const { state } = useAppStore()
const { startCamera, captureFrame, stopCamera, error: cameraError } = useCamera()

const videoRef = ref(null)
const showCamera = ref(false)
const meterInput = ref(state.meterBaru)
const loadingFoto = ref(false)
const error = ref('')
const successMsg = ref('')

const bisaLanjut = computed(() => {
  return meterInput.value && parseFloat(meterInput.value) >= 0
})

async function bukaKamera() {
  showCamera.value = true
  await startCamera(videoRef.value)
}

function ambilFoto() {
  const base64 = captureFrame(videoRef.value, 0.6)
  if (base64) {
    state.fotoBase64 = base64
    stopCamera()
    showCamera.value = false
    successMsg.value = 'Foto berhasil diambil'
  }
}

function ulangFoto() {
  state.fotoBase64 = ''
  successMsg.value = ''
}

function pilihGaleri(e) {
  const file = e.target.files[0]
  if (!file) return
  loadingFoto.value = true
  const reader = new FileReader()
  reader.onload = (ev) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const maxW = 1280
      let w = img.width
      let h = img.height
      if (w > maxW) {
        h = (h * maxW) / w
        w = maxW
      }
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      state.fotoBase64 = canvas.toDataURL('image/jpeg', 0.6)
      loadingFoto.value = false
      successMsg.value = 'Foto berhasil dipilih'
    }
    img.src = ev.target.result
  }
  reader.readAsDataURL(file)
}

function lanjut() {
  if (!bisaLanjut.value) return
  state.meterBaru = meterInput.value
  router.push('/lokasi')
}

function kembali() {
  stopCamera()
  router.push('/pelanggan')
}

onBeforeUnmount(() => {
  stopCamera()
})
</script>
