// Fix data.json issues: add H3, lists, internal links, Wikipedia, keyword in first 100 words
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const wikiLinks = [
  '<a href="https://id.wikipedia.org/wiki/Mesin_slot" target="_blank" rel="noopener noreferrer">mesin slot</a>',
  '<a href="https://id.wikipedia.org/wiki/Permainan_video" target="_blank" rel="noopener noreferrer">permainan video</a>',
  '<a href="https://id.wikipedia.org/wiki/Pembangkit_bilangan_acak" target="_blank" rel="noopener noreferrer">Random Number Generator</a>',
  '<a href="https://id.wikipedia.org/wiki/Keamanan_komputer" target="_blank" rel="noopener noreferrer">keamanan komputer</a>',
  '<a href="https://id.wikipedia.org/wiki/Perlindungan_konsumen" target="_blank" rel="noopener noreferrer">perlindungan konsumen</a>',
  '<a href="https://id.wikipedia.org/wiki/Pembayaran_digital" target="_blank" rel="noopener noreferrer">pembayaran digital</a>',
  '<a href="https://id.wikipedia.org/wiki/Manajemen_risiko" target="_blank" rel="noopener noreferrer">manajemen risiko</a>',
  '<a href="https://id.wikipedia.org/wiki/Teori_permainan" target="_blank" rel="noopener noreferrer">teori permainan</a>',
  '<a href="https://id.wikipedia.org/wiki/Komputasi_awan" target="_blank" rel="noopener noreferrer">komputasi awan</a>',
  '<a href="https://id.wikipedia.org/wiki/Enkripsi" target="_blank" rel="noopener noreferrer">enkripsi data</a>',
  '<a href="https://id.wikipedia.org/wiki/Probabilitas" target="_blank" rel="noopener noreferrer">probabilitas</a>',
  '<a href="https://id.wikipedia.org/wiki/Komunitas_virtual" target="_blank" rel="noopener noreferrer">komunitas virtual</a>'
];

const h3Additions = [
  'Tips Praktis untuk Pemula',
  'Kesalahan yang Harus Dihindari',
  'Perbandingan dengan Kompetitor',
  'Panduan Langkah demi Langkah',
  'Hal yang Sering Ditanyakan',
  'Rekomendasi Terbaik 2026',
  'Strategi Optimal',
  'Aspek Keamanan',
  'Fitur Unggulan',
  'Catatan Penting',
  'Analisis Mendalam',
  'Tips dari Member Berpengalaman'
];

const defaultList = [
  '<strong>Keamanan berlapis</strong> — enkripsi SSL 256-bit dan autentikasi dua faktor',
  '<strong>Proses cepat</strong> — transaksi selesai dalam hitungan menit',
  '<strong>Support 24/7</strong> — tim customer service siap membantu kapan saja',
  '<strong>Mobile friendly</strong> — akses optimal dari semua perangkat',
  '<strong>Transparan</strong> — data dan informasi ditampilkan secara terbuka'
];

const defaultOrdered = [
  '<strong>Persiapan</strong> — pastikan akun sudah terverifikasi dan dokumen lengkap',
  '<strong>Pilih layanan</strong> — tentukan fitur yang sesuai dengan kebutuhan',
  '<strong>Mulai bertahap</strong> — awali dengan skala kecil untuk memahami mekanisme',
  '<strong>Evaluasi</strong> — review hasil secara berkala dan sesuaikan strategi',
  '<strong>Konsistensi</strong> — terapkan pendekatan disiplin untuk hasil optimal'
];

const pages = fs.readdirSync(dir).filter(f => f.startsWith('page') && fs.statSync(path.join(dir, f)).isDirectory());
// Also check root data.json
if (fs.existsSync(path.join(dir, 'data.json'))) pages.unshift('ROOT');

let fixed = 0;
pages.forEach((pg, idx) => {
  const jsonPath = pg === 'ROOT' ? path.join(dir, 'data.json') : path.join(dir, pg, 'data.json');
  if (!fs.existsSync(jsonPath)) return;

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let changed = false;

  // 1. Ensure keyword LXTOTO in first paragraph
  if (data.sections && data.sections.length > 0) {
    const firstSec = data.sections[0];
    if (firstSec.paragraphs && firstSec.paragraphs.length > 0) {
      if (!firstSec.paragraphs[0].toUpperCase().includes('LXTOTO')) {
        firstSec.paragraphs[0] = '<strong>LXTOTO</strong> menghadirkan layanan terbaik dalam kategori ini. ' + firstSec.paragraphs[0];
        changed = true;
      }
    }
  }

  // 2. Add H3 to sections that don't have one (pick 2 sections)
  if (data.sections) {
    let h3Added = 0;
    data.sections.forEach((s, si) => {
      if (!s.h3 && s.h2 && h3Added < 2 && si > 0 && si < data.sections.length - 1) {
        s.h3 = h3Additions[(idx + si) % h3Additions.length];
        h3Added++;
        changed = true;
      }
    });
  }

  // 3. Ensure at least 1 list exists
  if (data.sections) {
    const hasUl = data.sections.some(s => s.list && s.list.length > 0);
    const hasOl = data.sections.some(s => s.ordered && s.ordered.length > 0);

    if (!hasUl && data.sections.length > 2) {
      data.sections[1].list = defaultList;
      changed = true;
    }
    if (!hasOl && data.sections.length > 3) {
      data.sections[Math.min(3, data.sections.length - 1)].ordered = defaultOrdered;
      changed = true;
    }
  }

  // 4. Add Wikipedia link to a paragraph if missing
  const jsonStr = JSON.stringify(data);
  if (!jsonStr.includes('wikipedia')) {
    if (data.sections && data.sections.length > 2) {
      const targetSec = data.sections[2];
      if (targetSec.paragraphs && targetSec.paragraphs.length > 0) {
        const wiki = wikiLinks[idx % wikiLinks.length];
        targetSec.paragraphs.push('Untuk informasi lebih lanjut, baca tentang ' + wiki + ' di Wikipedia yang menjelaskan konsep dasar terkait topik ini.');
        changed = true;
      }
    }
  }

  // 5. Add internal anchor links to first paragraph
  if (data.sections && data.sections.length > 0) {
    const firstSec = data.sections[0];
    if (firstSec.paragraphs && firstSec.paragraphs.length > 0) {
      if (!firstSec.paragraphs[firstSec.paragraphs.length - 1].includes('href="#')) {
        firstSec.paragraphs.push('Lihat <a href="#faq">pertanyaan umum</a> dan <a href="#perbandingan">tabel perbandingan</a> di bagian bawah halaman ini.');
        changed = true;
      }
    }
  }

  // 6. Add id to table section for internal link
  if (data.sections) {
    data.sections.forEach(s => {
      if (s.table && !s.h2.includes('id=')) {
        // The render.js slugify will handle this
      }
    });
  }

  if (changed) {
    fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf8');
    fixed++;
    console.log('✓ ' + pg);
  } else {
    console.log('  ' + pg + ' (no changes needed)');
  }
});

console.log('\nFixed: ' + fixed + ' files');
