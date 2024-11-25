import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// CORS'u etkinleştir
app.use(cors());

// Dinamik proxy endpoint
app.get('/static/*', async (req, res) => {
    try {
        // İstekten gelen path'i al
        const targetPath = req.path;
        
        // Hedef URL'yi oluştur
        const baseUrl = 'https://livetiming.formula1.com';
        const targetUrl = `${baseUrl}${targetPath}`;

        console.log(`Proxy yönlendiriyor: ${targetUrl}`);

        // Hedef URL'ye istek gönder
        const response = await fetch(targetUrl);
        
        // Gelen veriyi JSON formatında döndür
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Hedef API hatası', details: await response.text() });
        }
    } catch (error) {
        console.error('Hata oluştu:', error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Proxy sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
