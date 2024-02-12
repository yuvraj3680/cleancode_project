const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/search', async (req, res) => {
  const apiKey = 'ef78b36d'; // Replace with your OMDB API key
  const query = req.body.query;
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const searchResults = response.data.Search;
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: `Error searching for movies: ${error.message}` });
  }
});

app.get('/movie/:id', async (req, res) => {
  const apiKey = 'ef78b36d'; // Replace with your OMDB API key
  const movieId = req.params.id;
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

  try {
    const response = await axios.get(apiUrl);
    const movieDetails = response.data;
    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ error: `Error fetching movie details: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
