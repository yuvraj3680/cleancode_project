const  axios = require("axios");


document.addEventListener('DOMContentLoaded', async function () {
    try {
        const apiEndpoint = 'https://api.sports-scores.com/scores';
      const response = await axios.get(apiEndpoint); 
      const sportsData = await response.json();
  
      
      const sportsDataContainer = document.getElementById('sportsDataContainer');
      sportsDataContainer.innerHTML = generateHTMLForSportsData(sportsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    }
  });
  
  
  function generateHTMLForSportsData(data) {
    
    const matchesHTML = data.matches.map(match => `
      <div class="match">
        <h2>${match.team1} vs ${match.team2}</h2>
        <p>Date: ${match.date}</p>
        <p>Score: ${match.score}</p>
        
        
      </div>
    `).join('');
  
    return `<div id="matches">${matchesHTML}</div>`;
  }
  