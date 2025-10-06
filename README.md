# Open DID Project

Proyek sederhana untuk membuat dan mengelola Decentralized Identifiers (DID) dengan JWT.

## Struktur Project

```
open-did-project/
│
├── node_modules/        # otomatis dibuat saat npm install
├── package.json         # konfigurasi project dan dependencies
├── index.js             # kode utama untuk membuat DID & JWT
├── index.html           # UI untuk interaksi pengguna
├── app.js               # file OpenID yang sudah ada (bisa dihapus)
└── README.md            # dokumentasi project
```

## Instalasi

1. Pastikan Node.js sudah terinstall
2. Install dependencies:
   ```bash
   npm install
   ```

## Penggunaan

### Menjalankan Server Node.js
```bash
npm start
# atau
node index.js
```

### Membuka UI
Buka file `index.html` di browser untuk menggunakan interface web.

## Fitur

### 1. Pembuatan DID
- Membuat Decentralized Identifier sederhana
- Format: `did:example:[random_string]`

### 2. Pembuatan dan Verifikasi JWT
- Membuat JWT token dengan payload DID
- Verifikasi JWT token
- Menggunakan algoritma HS256

### 3. Wallet DID
- Membuat wallet sederhana dengan private/public key
- Menyimpan informasi wallet

### 4. Interface Web
- UI yang user-friendly untuk membuat DID
- Menyimpan data di localStorage browser
- Tampilan yang responsif

## API Functions

### `createDid()`
Membuat DID baru dengan string random.

### `createAndVerifyJwt(did)`
Membuat dan memverifikasi JWT token untuk DID yang diberikan.

### `createDidWallet()`
Membuat wallet DID dengan private/public key.

## Catatan

- Ini adalah implementasi sederhana untuk pembelajaran
- DID yang dibuat hanya contoh dengan string random
- Untuk production, gunakan library DID yang lebih canggih
- JWT menggunakan secret key sederhana (tidak untuk production)

## Dependencies

- `did-jwt`: Library untuk membuat dan memverifikasi JWT dengan DID

## Lisensi

ISC
