<template>
  <div class="step-card">
    <div class="step-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
    </div>
    <h2 class="step-title">Cetak Bukti</h2>
    <p class="step-desc">Cetak bukti baca meter ke printer thermal</p>

    <div class="step-body">
      <div class="receipt" id="receipt-content">
        <div class="receipt-header">
          <div style="font-size:20px;font-weight:700;color:var(--primary);">TOYA BENING</div>
          <div style="font-size:11px;color:#555;">Pencatatan Meter Air</div>
        </div>

        <div style="margin-bottom:10px;">
          <div style="text-align:center;font-weight:700;font-size:14px;margin-bottom:8px;">
            BUKTI BACA METER
          </div>

          <div class="receipt-line">
            <span class="receipt-label">ID Pelanggan</span>
            <span class="receipt-value">{{ state.pelanggan?.id }}</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Nama</span>
            <span class="receipt-value">{{ state.pelanggan?.nama }}</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Alamat</span>
            <span class="receipt-value" style="max-width:180px;">{{ state.pelanggan?.alamat }}</span>
          </div>

          <div class="receipt-divider"></div>

          <div class="receipt-line">
            <span class="receipt-label">Meter Baru</span>
            <span class="receipt-value">{{ state.meterBaru }} m³</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Tanggal</span>
            <span class="receipt-value">{{ tanggal }}</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Jam</span>
            <span class="receipt-value">{{ jam }}</span>
          </div>
          <div class="receipt-line" style="font-size:10px;">
            <span class="receipt-label">Lokasi</span>
            <span class="receipt-value">{{ state.latitude?.toFixed(6) }}, {{ state.longitude?.toFixed(6) }}</span>
          </div>
        </div>

        <div style="text-align:center;margin-bottom:6px;">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <rect x="5" y="5" width="90" height="90" fill="white" stroke="#000" stroke-width="1"/>
            <g transform="translate(10,15)">
              <rect x="0" y="0" width="80" height="8" fill="#000"/>
              <rect x="0" y="14" width="80" height="8" fill="#000"/>
              <rect x="0" y="28" width="80" height="8" fill="#000"/>
              <rect x="0" y="42" width="80" height="8" fill="#000"/>
              <rect x="0" y="56" width="80" height="8" fill="#000"/>
            </g>
          </svg>
        </div>

        <div class="receipt-footer">
          Terima kasih<br/>
          Data tersimpan dengan aman
        </div>
      </div>

      <div style="margin-top:16px;text-align:center;font-size:12px;color:var(--text-secondary);">
        Tekan tombol cetak untuk mencetak ke printer thermal
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-outline" @click="keScan">Scan Lagi</button>
      <button class="btn btn-primary" @click="cetak">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Cetak
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../composables/useAppStore.js'

const router = useRouter()
const { state } = useAppStore()

const now = new Date()
const tanggal = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

function cetak() {
  const receipt = document.getElementById('receipt-content')
  if (!receipt) return

  const win = window.open('', '_blank', 'width=300,height=600')
  if (!win) {
    window.print()
    return
  }

  win.document.write(`
    <html><head>
      <title>Cetak - Toya Bening</title>
      <style>
        @page { margin: 0; size: 80mm auto; }
        body { margin:0; padding:10px; font-family:'Courier New',Courier,monospace; font-size:12px; color:#000; }
        * { box-sizing:border-box; }
        .receipt { max-width:80mm; margin:0 auto; }
        .receipt-header { text-align:center; margin-bottom:12px; padding-bottom:12px; border-bottom:1px dashed #000; }
        .receipt-line { display:flex; justify-content:space-between; padding:2px 0; }
        .receipt-label { color:#555; }
        .receipt-value { font-weight:600; text-align:right; }
        .receipt-divider { border-top:1px dashed #000; margin:10px 0; }
        .receipt-footer { text-align:center; margin-top:12px; padding-top:12px; border-top:1px dashed #000; }
      </style>
    </head><body>
      ${receipt.outerHTML}
      <script>window.onload = function() { window.print(); window.close(); } <\/script>
    </body></html>
  `)
  win.document.close()
}

function keScan() {
  state.reset()
  router.push('/scan')
}

onMounted(() => {
  if (!state.submitResult && state.pelanggan) {
    // langsung dari konfirmasi, ok
  }
})
</script>
