<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <h2 class="step-title">Data Pelanggan</h2>
    <p class="step-desc">Konfirmasi data pelanggan sebelum lanjut</p>

    <div class="step-body">
      <div v-if="error" class="error-msg">{{ error }}</div>
      <div v-if="duplikat" class="error-msg">Data untuk bulan ini sudah ada! Tidak bisa input duplikat.</div>

      <div v-if="loading" class="loading-dots">
        <span></span><span></span><span></span>
        <p style="margin-left:8px;font-size:13px;color:var(--text-secondary);">Mencari data...</p>
      </div>

      <template v-if="state.pelanggan && !loading">
        <div class="pelanggan-card">
          <div class="pelanggan-nama">{{ state.pelanggan.nama }}</div>
          <div class="pelanggan-alamat">{{ state.pelanggan.alamat }}</div>
          <div class="pelanggan-id">ID: {{ state.pelanggan.id }}</div>
        </div>

        <div v-if="state.pelanggan.fotoLama" style="margin-top:12px;">
          <p class="form-label">Foto Meter Sebelumnya</p>
          <img :src="state.pelanggan.fotoLama" style="width:100%;border-radius:10px;max-height:160px;object-fit:cover;" />
        </div>
      </template>

      <template v-if="!state.pelangganId && !loading">
        <div class="error-msg">ID Pelanggan tidak ditemukan. Scan QR terlebih dahulu.</div>
      </template>
    </div>

    <div v-if="state.pelanggan && !loading && !duplikat" class="btn-group">
      <button class="btn btn-outline" @click="batal">Batal</button>
      <button class="btn btn-primary" @click="lanjut">Lanjut</button>
    </div>
    <div v-else-if="duplikat" class="btn-group">
      <button class="btn btn-outline" @click="batal">Kembali</button>
    </div>
    <div v-else-if="!state.pelangganId" class="btn-group">
      <button class="btn btn-primary" @click="keScan">Scan QR</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../composables/useAppStore.js'
import { cariPelanggan, cekDuplikat } from '../services/api.js'

const router = useRouter()
const { state } = useAppStore()

const loading = ref(true)
const error = ref('')
const duplikat = ref(false)

onMounted(async () => {
  if (!state.pelangganId) {
    loading.value = false
    return
  }

  try {
    const res = await cariPelanggan(state.pelangganId)
    if (res.success) {
      state.pelanggan = res.pelanggan
    } else {
      error.value = res.error || 'Pelanggan tidak ditemukan'
    }
  } catch (e) {
    error.value = 'Gagal terhubung ke server. Periksa koneksi internet.'
  }

  if (state.pelanggan) {
    try {
      const now = new Date()
      const cek = await cekDuplikat(state.pelangganId, String(now.getMonth() + 1), String(now.getFullYear()))
      if (cek.duplikat) {
        duplikat.value = true
        error.value = cek.pesan || 'Data untuk bulan ini sudah tercatat'
      }
    } catch (e) {
      // silently fail - duplicate check is a bonus feature
    }
  }

  loading.value = false
})

function lanjut() {
  router.push('/meter')
}

function batal() {
  state.reset()
  router.push('/scan')
}

function keScan() {
  router.push('/scan')
}
</script>
