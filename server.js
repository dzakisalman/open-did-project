const express = require('express');
const cors = require('cors');
const { createDid, createDidWallet } = require('./index');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Store untuk menyimpan DIDs (dalam production gunakan database)
const didStore = new Map();

// API Routes

// POST /api/did - Membuat DID baru
app.post('/api/did', (req, res) => {
    try {
        const did = createDid();
        const wallet = createDidWallet();
        
        // Simpan ke store
        didStore.set(did, {
            wallet
        });
        
        res.json({
            success: true,
            did,
            wallet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/did/:did - Resolve DID
app.get('/api/did/:did', (req, res) => {
    try {
        const { did } = req.params;
        
        if (didStore.has(did)) {
            const storedData = didStore.get(did);
            res.json({
                success: true,
                did,
                wallet: storedData.wallet
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'DID not found'
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'DID not found'
        });
    }
});

// GET /api/dids - List semua DIDs
app.get('/api/dids', (req, res) => {
    try {
        const dids = Array.from(didStore.keys());
        res.json({
            success: true,
            count: dids.length,
            dids
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE /api/did/:did - Hapus DID
app.delete('/api/did/:did', (req, res) => {
    try {
        const { did } = req.params;
        
        if (didStore.has(did)) {
            didStore.delete(did);
            res.json({
                success: true,
                message: `DID ${did} deleted successfully`
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'DID not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Open DID API is running',
        timestamp: new Date().toISOString(),
        didCount: didStore.size
    });
});

app.listen(port, () => {
    console.log(`🚀 Open DID API Server running at http://localhost:${port}`);
    console.log(`📚 API Documentation:`);
    console.log(`   POST /api/did - Create new DID`);
    console.log(`   GET  /api/did/:did - Resolve DID`);
    console.log(`   GET  /api/dids - List all DIDs`);
    console.log(`   DELETE /api/did/:did - Delete DID`);
    console.log(`   GET  /api/health - Health check`);
});
