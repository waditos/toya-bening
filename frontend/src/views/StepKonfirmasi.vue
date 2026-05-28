<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h2 class="step-title">Konfirmasi Data</h2>
    <p class="step-desc">Periksa kembali data sebelum disimpan</p>

    <div class="step-body">
      <div v-if="error" class="error-msg">{{ error }}</div>
      <div v-if="submitSuccess" class="success-msg">Data berhasil disimpan!</div>

      <div class="info-card">
        <div class="info-row">
          <span class="info-label">ID Pelanggan</span>
          <span class="info-value">{{ state.pelanggan?.id }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Nama</span>
          <span class="info-value">{{ state.pelanggan?.nama }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Alamat</span>
          <span class="info-value">{{ state.pelanggan?.alamat }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Meter Baru</span>
          <span class="info-value">{{ state.meterBaru }} m³</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tanggal</span>
          <span class="info-value">{{ tanggalFormatted }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Lokasi</span>
          <span class="info-value" style="font-size:11px;">
            {{ state.latitude?.toFixed(6) }}, {{ state.longitude?.toFixed(6) }}
          </span>
        </div>
      </div>

      <div v-if="state.fotoBase64" style="margin-top:8px;">
        <p class="form-label">Foto Meter</p>
        <img :src="state.fotoBase64" style="width:100%;border-radius:10px;max-height:180px;object-fit:contain;background:#F1F5F9;" />
      </div>
    </div>

    <div v-if="!submitSuccess" class="btn-group">
      <button class="btn btn-outline" @click="kembali">Kembali</button>
      <button class="btn btn-success" :disabled="submitting" @click="simpan">
        <span v-if="submitting">
          <span class="loading-dots" style="padding:0;display:inline-flex;gap:4px;"><span></span><span></span><span></span></span>
          Menyimpan...
        </span>
        <span v-else>Simpan Data</span>
      </button>
    </div>
    <div v-else class="btn-group">
      <button class="btn btn-primary" @click="keCetak">Cetak Bukti</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../composables/useAppStore.js'
import { simpanData } from '../services/api.js'

const router = useRouter()
const { state } = useAppStore()

const submitting = ref(false)
const submitSuccess = ref(false)
const error = ref('')

const tanggalFormatted = computed(() => {
  const d = new Date()
  const opts = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  return d.toLocaleDateString('id-ID', opts)
})

async function simpan() {
  if (submitting.value) return
  submitting.value = true
  error.value = ''

  const now = new Date()
  const data = {
    action: 'simpan',
    pelangganId: state.pelanggan.id,
    nama: state.pelanggan.nama,
    alamat: state.pelanggan.alamat,
    meterBaru: state.meterBaru,
    fotoBase64: state.fotoBase64,
    latitude: state.latitude,
    longitude: state.longitude,
    bulan: String(now.getMonth() + 1),
    tahun: String(now.getFullYear()),
  }

  try {
    const res = await simpanData(data)
    if (res.success) {
      submitSuccess.value = true
      state.submitResult = res
    } else {
      error.value = res.error || 'Gagal menyimpan data'
    }
  } catch (e) {
    error.value = 'Gagal terhubung ke server. Coba lagi.'
  }

  submitting.value = false
}

function keCetak() {
  router.push('/cetak')
}

function kembali() {
  router.push('/lokasi')
}
</script>
