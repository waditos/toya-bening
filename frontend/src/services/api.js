const GAS_URL = 'https://script.google.com/macros/s/AKfycbxUKNVCKn0mHFNOOKQpRSHr-2VdlakdGqpM1HXJqqP8o6j95LU2Ds9ZxVnJszi6do8XBA/exec'

export async function cariPelanggan(id) {
  const url = `${GAS_URL}?action=cariPelanggan&id=${encodeURIComponent(id)}`
  const res = await fetch(url)
  return res.json()
}

export async function cekDuplikat(id, bulan, tahun) {
  const url = `${GAS_URL}?action=cekDuplikat&id=${encodeURIComponent(id)}&bulan=${encodeURIComponent(bulan)}&tahun=${encodeURIComponent(tahun)}`
  const res = await fetch(url)
  return res.json()
}

export async function simpanData(data) {
  const res = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function rekap(bulan, tahun) {
  const url = `${GAS_URL}?action=rekap&bulan=${encodeURIComponent(bulan)}&tahun=${encodeURIComponent(tahun)}`
  const res = await fetch(url)
  return res.json()
}
