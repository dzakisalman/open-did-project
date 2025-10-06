// Fungsi membuat DID
function createDid() {
    const did = 'did:example:' + Math.random().toString(36).substring(2, 15);
    console.log(`DID yang dihasilkan: ${did}`);
    return did;
}

// Fungsi membuat JWT sederhana (simulasi)
function createSimpleJWT(payload) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    // Simulasi signature sederhana
    const signature = Buffer.from('signature_' + Math.random().toString(36).substring(2, 15)).toString('base64url');
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Fungsi membuat dan verifikasi JWT
function createAndVerifyJwt(did) {
    try {
        const payload = { 
            data: 'Contoh data untuk DID', 
            did: did,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
        };

        // Membuat JWT sederhana
        const jwt = createSimpleJWT(payload);
        console.log(`JWT yang dibuat: ${jwt}`);

        // Simulasi verifikasi JWT
        const parts = jwt.split('.');
        if (parts.length === 3) {
            const decodedPayload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
            console.log('Hasil verifikasi JWT:', decodedPayload);
            return { jwt, verified: decodedPayload };
        } else {
            throw new Error('Invalid JWT format');
        }
    } catch (error) {
        console.error('Error creating or verifying JWT:', error);
        return null;
    }
}

// Fungsi untuk membuat wallet DID sederhana
function createDidWallet() {
    const wallet = {
        did: createDid(),
        privateKey: 'private_key_' + Math.random().toString(36).substring(2, 15),
        publicKey: 'public_key_' + Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString()
    };
    
    console.log('Wallet DID dibuat:', wallet);
    return wallet;
}

// Contoh penggunaan
function main() {
    console.log('=== Open DID Project ===');
    console.log('1. Membuat DID...');
    const did = createDid();
    
    console.log('\n2. Membuat dan memverifikasi JWT...');
    const jwtResult = createAndVerifyJwt(did);
    
    console.log('\n3. Membuat wallet DID...');
    const wallet = createDidWallet();
    
    console.log('\n=== Selesai ===');
}

// Jalankan jika file ini dijalankan langsung
if (require.main === module) {
    main();
}

// Export fungsi untuk digunakan di file lain
module.exports = {
    createDid,
    createAndVerifyJwt,
    createDidWallet
};
