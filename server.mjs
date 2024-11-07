import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5004;

// Enable CORS to allow requests from your frontend
app.use(cors());

// CoinMarketCap API key
const apiKey = '55546c6e-71b0-4bb6-8470-85196f7762e3'; // Replace with your actual API key

// Existing API endpoint for general cryptocurrency data
app.get('/api/cryptocurrency', async (req, res) => {
  const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

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

// New API endpoint for fetching data of a specific cryptocurrency by ID
app.get('/api/cryptocurrency/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`;

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


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
