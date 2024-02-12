

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/api/news', async (req, res) => {
  try {
    // Use a free News API (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = '83085d366e964210b643b530f25425b5';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    const response = await axios.get(apiUrl);
    const articles = response.data.articles;

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
