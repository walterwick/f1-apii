import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// CORS'u etkinleştir
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const url = 'https://livetiming.formula1.com/static/SessionInfo.json';
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Hata oluştu:', error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
