<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    </div>
    <h2 class="step-title">Rekap Bulanan</h2>
    <p class="step-desc">Data pencatatan meter per bulan</p>

    <div class="step-body">
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <select v-model="bulan" class="form-input" style="flex:1;">
          <option v-for="(b, i) in daftarBulan" :key="i" :value="i + 1">{{ b }}</option>
        </select>
        <select v-model="tahun" class="form-input" style="width:100px;">
          <option v-for="t in daftarTahun" :key="t" :value="t">{{ t }}</option>
        </select>
        <button class="btn btn-primary" style="width:auto;padding:12px 16px;" @click="loadData">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </button>
      </div>

      <div v-if="loading" class="loading-dots">
        <span></span><span></span><span></span>
      </div>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <template v-if="!loading && records.length > 0">
        <div class="rekap-stats">
          <div class="stat-card">
            <div class="stat-value">{{ records.length }}</div>
            <div class="stat-label">Total Catatan</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ totalMeter }}</div>
            <div class="stat-label">Total m³</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ rataMeter }}</div>
            <div class="stat-label">Rata-rata m³</div>
          </div>
        </div>

        <div style="overflow-y:auto;flex:1;border-radius:10px;border:1px solid #E2E8F0;">
          <table class="rekap-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Nama</th>
                <th>Meter</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in records" :key="r.ID">
                <td>{{ i + 1 }}</td>
                <td style="font-family:monospace;font-size:11px;">{{ r.PelangganID }}</td>
                <td>{{ r.Nama }}</td>
                <td>{{ r.MeterBaru }}</td>
                <td style="font-size:11px;">{{ formatTanggal(r.Tanggal) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <div v-else-if="!loading && !error" style="text-align:center;padding:30px;color:var(--text-secondary);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <p>Pilih bulan dan tahun, lalu klik tombol refresh</p>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-outline" @click="cetakRekap">Cetak Rekap</button>
      <button class="btn btn-primary" @click="keScan">Scan Baru</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { rekap } from '../services/api.js'
import { useAppStore } from '../composables/useAppStore.js'

const router = useRouter()
const { state } = useAppStore()

const now = new Date()
const bulan = ref(now.getMonth() + 1)
const tahun = ref(now.getFullYear())
const records = ref([])
const loading = ref(false)
const error = ref('')

const daftarBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const daftarTahun = computed(() => {
  const th = now.getFullYear()
  return [th - 2, th - 1, th, th + 1]
})

const totalMeter = computed(() => {
  return records.value.reduce((sum, r) => sum + (parseFloat(r.MeterBaru) || 0), 0).toFixed(1)
})

const rataMeter = computed(() => {
  if (records.value.length === 0) return '0'
  return (parseFloat(totalMeter.value) / records.value.length).toFixed(1)
})

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const res = await rekap(String(bulan.value), String(tahun.value))
    if (res.success) {
      records.value = res.data || []
    } else {
      error.value = res.error || 'Gagal memuat data'
    }
  } catch (e) {
    error.value = 'Gagal terhubung ke server'
  }
  loading.value = false
}

function formatTanggal(t) {
  if (!t) return '-'
  const d = new Date(t)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function cetakRekap() {
  const konten = `
    <html><head>
      <title>Rekap Bulanan - Toya Bening</title>
      <style>
        @page { margin: 10mm; }
        body { font-family: Arial, sans-serif; font-size: 12px; }
        h2 { text-align: center; color: #1A56DB; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #1A56DB; color: white; padding: 6px; text-align: left; }
        td { padding: 4px 6px; border-bottom: 1px solid #ddd; }
        .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #666; }
      </style>
    </head><body>
      <h2>TOYA BENING</h2>
      <p style="text-align:center;">Rekap Bulanan - ${daftarBulan[bulan.value - 1]} ${tahun.value}</p>
      <p style="text-align:center;">Jumlah: ${records.value.length} catatan | Total: ${totalMeter.value} m³</p>
      <table>
        <tr><th>No</th><th>ID</th><th>Nama</th><th>Meter</th><th>Tanggal</th></tr>
        ${records.value.map((r, i) => `<tr><td>${i+1}</td><td>${r.PelangganID}</td><td>${r.Nama}</td><td>${r.MeterBaru}</td><td>${formatTanggal(r.Tanggal)}</td></tr>`).join('')}
      </table>
      <div class="footer">Dicetak dari Toya Bening - ${new Date().toLocaleDateString('id-ID')}</div>
    </body></html>
  `
  const win = window.open('', '_blank', 'width=800,height=600')
  if (win) {
    win.document.write(konten)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print() }, 500)
  } else {
    error.value = 'Popup diblokir. Izinkan popup untuk cetak.'
  }
}

function keScan() {
  state.reset()
  router.push('/scan')
}
</script>
