import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // This should work now

const app = express();
const PORT = 5004; // Choose a port for your server

app.use(cors()); // Allow all origins

app.get('/api/cryptocurrency', async (req, res) => {
  const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
  const apiKey = '55546c6e-71b0-4bb6-8470-85196f7762e3'; // Replace with your CoinMarketCap API key

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


