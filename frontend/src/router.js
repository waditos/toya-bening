import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/scan' },
  { path: '/scan', name: 'ScanQr', component: () => import('./views/StepScanQr.vue') },
  { path: '/pelanggan', name: 'DataPelanggan', component: () => import('./views/StepDataPelanggan.vue') },
  { path: '/meter', name: 'InputMeter', component: () => import('./views/StepInputMeter.vue') },
  { path: '/lokasi', name: 'Lokasi', component: () => import('./views/StepLokasi.vue') },
  { path: '/konfirmasi', name: 'Konfirmasi', component: () => import('./views/StepKonfirmasi.vue') },
  { path: '/cetak', name: 'Cetak', component: () => import('./views/StepCetak.vue') },
  { path: '/rekap', name: 'Rekap', component: () => import('./views/HalamanRekap.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
