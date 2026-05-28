<template>
  <div id="app-root">
    <header class="header">
      <div class="header-title">
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
          <path d="M50 5C50 5 15 45 15 65a35 35 0 0 0 70 0C85 45 50 5 50 5z" fill="rgba(255,255,255,0.9)"/>
          <path d="M50 45a20 20 0 0 0-20 20h40a20 20 0 0 0-20-20z" fill="rgba(26,86,219,0.3)"/>
        </svg>
        Toya Bening
        <span class="header-sub">| Pencatatan Meter</span>
      </div>
      <router-link v-if="route.path !== '/rekap'" to="/rekap" style="background:rgba(255,255,255,0.15);color:white;padding:6px 12px;border-radius:8px;font-size:12px;text-decoration:none;font-weight:500;">
        Rekap
      </router-link>
      <router-link v-else to="/scan" style="background:rgba(255,255,255,0.15);color:white;padding:6px 12px;border-radius:8px;font-size:12px;text-decoration:none;font-weight:500;">
        Scan
      </router-link>
    </header>

    <div v-if="showWizard" class="wizard-steps">
      <div v-for="(s, i) in wizardSteps" :key="i" style="display:flex;align-items:center;">
        <div v-if="i > 0" :class="['step-line', { active: currentStepIndex >= i, done: currentStepIndex > i }]"></div>
        <div :class="['step-dot', {
          active: currentStepIndex === i && stepIcons[i] !== 'check',
          done: stepIcons[i] === 'check',
          pending: currentStepIndex < i
        }]">
          <span v-if="stepIcons[i] === 'check'" style="font-size:14px;">&#10003;</span>
          <span v-else-if="stepIcons[i] === 'lock'">&#128274;</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
      </div>
    </div>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <div class="print-area" ref="printArea"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const printArea = ref(null)

const wizardRoutes = ['/scan', '/pelanggan', '/meter', '/lokasi', '/konfirmasi', '/cetak']

const wizardSteps = [
  { label: 'Scan', route: '/scan' },
  { label: 'Data', route: '/pelanggan' },
  { label: 'Meter', route: '/meter' },
  { label: 'Lokasi', route: '/lokasi' },
  { label: 'Konfirmasi', route: '/konfirmasi' },
  { label: 'Cetak', route: '/cetak' },
]

const showWizard = computed(() => wizardRoutes.includes(route.path))

const currentStepIndex = computed(() => {
  const idx = wizardRoutes.indexOf(route.path)
  return idx >= 0 ? idx : -1
})

const stepIcons = computed(() => {
  const current = currentStepIndex.value
  return wizardRoutes.map((r, i) => {
    if (i < current) return 'check'
    if (i === current) return i + 1
    return 'lock'
  })
})
</script>
