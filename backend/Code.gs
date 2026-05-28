function doGet(e) {
  var action = e.parameter.action;
  var output;

  if (action === 'cariPelanggan') {
    output = cariPelanggan(e.parameter.id);
  } else if (action === 'cekDuplikat') {
    output = cekDuplikat(e.parameter.id, e.parameter.bulan, e.parameter.tahun);
  } else if (action === 'rekap') {
    output = rekap(e.parameter.bulan, e.parameter.tahun);
  } else {
    output = { error: 'Action tidak dikenal' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Format data tidak valid' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var action = data.action;
  var output;

  if (action === 'simpan') {
    output = simpanData(data);
  } else {
    output = { error: 'Action tidak dikenal' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function cariPelanggan(id) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('MasterPelanggan');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      return {
        success: true,
        pelanggan: {
          id: data[i][0],
          nama: data[i][1],
          alamat: data[i][2]
        }
      };
    }
  }

  return { success: false, error: 'Pelanggan tidak ditemukan' };
}

function cekDuplikat(id, bulan, tahun) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('DataBacaMeter');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (
      String(data[i][1]) === String(id) &&
      String(data[i][9]) === String(bulan) &&
      String(data[i][10]) === String(tahun)
    ) {
      return {
        success: true,
        duplikat: true,
        pesan: 'Data untuk pelanggan ini bulan ' + bulan + '/' + tahun + ' sudah ada'
      };
    }
  }

  return { success: true, duplikat: false };
}

function simpanData(d) {
  var duplikat = cekDuplikat(d.pelangganId, d.bulan, d.tahun);
  if (duplikat.duplikat) {
    return { success: false, error: duplikat.pesan };
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('DataBacaMeter');

  var row = [
    new Date().getTime(),
    d.pelangganId,
    d.nama,
    d.alamat,
    d.meterBaru,
    d.fotoBase64 || '',
    d.latitude || '',
    d.longitude || '',
    new Date(),
    d.bulan,
    d.tahun,
    'Valid'
  ];

  sheet.appendRow(row);

  return {
    success: true,
    pesan: 'Data berhasil disimpan',
    id: row[0]
  };
}

function rekap(bulan, tahun) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('DataBacaMeter');
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var result = [];

  for (var i = 1; i < data.length; i++) {
    if (
      String(data[i][9]) === String(bulan) &&
      String(data[i][10]) === String(tahun)
    ) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[i][j];
      }
      result.push(obj);
    }
  }

  return { success: true, data: result, jumlah: result.length };
}
