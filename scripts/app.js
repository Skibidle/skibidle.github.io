import { signInWithGitHub } from './firebase.js';

let games = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Load games
fetch('games.json')
  .then(res => res.json())
  .then(data => {
    games = data.map(game => ({
      ...game,
      rating: localStorage.getItem(`rating_${game.title}`) || 0
    }));
    renderGames(games);
  });

// Render games
function renderGames(games) {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = games.map(game => `
    <div class="game-card" data-category="${game.category}">
      <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
      <h3>${game.title}</h3>
      <div class="game-meta">
        <span class="rating">⭐ ${game.rating}</span>
        <button class="fav-btn" onclick="toggleFavorite('${game.title}')">
          ${favorites.includes(game.title) ? '❤️' : '🤍'}
        </button>
      </div>
      <button onclick="launchGame('${game.path}')">Play</button>
    </div>
  `).join('');
}

// Launch game
function launchGame(path) {
  const modal = document.getElementById('gameModal');
  const iframe = document.getElementById('gameFrame');
  iframe.src = path;
  modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('gameModal').style.display = 'none';
});

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = games.filter(game => 
    game.title.toLowerCase().includes(term) || 
    game.description.toLowerCase().includes(term)
  );
  renderGames(filtered);
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const body = document.body;
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.body.dataset.theme = savedTheme;

// GitHub Auth
document.getElementById('authButton').onclick = signInWithGitHub;

// === Add Game Functionality ===
function addGame(title, path, thumbnail, description, category) {
  const newGame = {
    title,
    path,
    thumbnail,
    description,
    category
  };

  // Add to games array
  games.push(newGame);

  // Update games.json
  fetch('games.json')
    .then(res => res.json())
    .then(data => {
      data.push(newGame);
      return fetch('games.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2)
      });
    })
    .then(() => {
      console.log(`Added ${title} to games.json`);
      renderGames(games); // Refresh the game grid
    })
    .catch(err => console.error('Error adding game:', err));
}


addGame(
  "Chess",
  "games/chess/index.html",
  "games/chess/icons/forward.png",
  "Play the classic Chess game.",
  "Puzzle"
);