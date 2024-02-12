

document.addEventListener('DOMContentLoaded', async () => {
    const newsContainer = document.getElementById('news-container');
  
    try {
      const response = await fetch('/api/news');
      const articles = await response.json();
  
      articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
  
        newsContainer.appendChild(articleElement);
      });
    } catch (error) {
      console.error(error);
    }
  });
  