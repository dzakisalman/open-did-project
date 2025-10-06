// Fungsi untuk membuat DID Document
function createDidDocument(did, publicKey) {
    const didDocument = {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": did,
        "verificationMethod": [{
            "id": `${did}#key-1`,
            "type": "Ed25519VerificationKey2020",
            "controller": did,
            "publicKeyMultibase": publicKey
        }],
        "authentication": [`${did}#key-1`],
        "assertionMethod": [`${did}#key-1`],
        "created": new Date().toISOString(),
        "updated": new Date().toISOString()
    };
    
    console.log('DID Document dibuat:', JSON.stringify(didDocument, null, 2));
    return didDocument;
}

// Fungsi untuk resolve DID (mendapatkan DID Document)
function resolveDid(did) {
    // Simulasi resolve DID dari registry
    console.log(`Mencoba resolve DID: ${did}`);
    
    // Dalam implementasi nyata, ini akan query ke blockchain/registry
    const mockDocument = {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": did,
        "verificationMethod": [{
            "id": `${did}#key-1`,
            "type": "Ed25519VerificationKey2020",
            "controller": did,
            "publicKeyMultibase": "z6MkhaXgBZDvotDkL5257faiztiGiU2QqMn3ebfC2Er2bXQ1"
        }],
        "authentication": [`${did}#key-1`]
    };
    
    return mockDocument;
}

module.exports = {
    createDid,
    createAndVerifyJwt,
    createDidWallet,
    createDidDocument,
    resolveDid
};
