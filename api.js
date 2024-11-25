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
        
        // Gelen içerik türünü al
        const contentType = response.headers.get('content-type');

        // İçeriğe göre işlem yap
        if (contentType && contentType.includes('application/json')) {
            // JSON ise ayrıştır ve döndür
            const data = await response.json();
            res.json(data);
        } else {
            // JSON değilse ham veriyi döndür
            const buffer = await response.buffer();
            res.set('Content-Type', contentType); // Doğru içerik türünü ayarla
            res.send(buffer); // Ham veriyi döndür
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
