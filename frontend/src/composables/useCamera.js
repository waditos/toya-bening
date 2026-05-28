import { ref } from 'vue'

export function useCamera() {
  const stream = ref(null)
  const error = ref('')

  async function startCamera(videoEl) {
    try {
      error.value = ''
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      stream.value = s
      if (videoEl) {
        videoEl.srcObject = s
        await videoEl.play()
      }
      return s
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        error.value = 'Izin kamera ditolak. Izinkan akses kamera di pengaturan browser.'
      } else if (err.name === 'NotFoundError') {
        error.value = 'Kamera tidak ditemukan di perangkat ini.'
      } else {
        error.value = 'Gagal mengakses kamera: ' + err.message
      }
      return null
    }
  }

  function captureFrame(videoEl, quality = 0.6) {
    if (!videoEl) return ''
    const canvas = document.createElement('canvas')
    canvas.width = videoEl.videoWidth
    canvas.height = videoEl.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoEl, 0, 0)
    return canvas.toDataURL('image/jpeg', quality)
  }

  function stopCamera() {
    if (stream.value) {
      stream.value.getTracks().forEach(t => t.stop())
      stream.value = null
    }
  }

  return { stream, error, startCamera, captureFrame, stopCamera }
}
