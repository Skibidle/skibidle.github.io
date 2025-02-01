// Game data array - add your games here
const games = [
    {
        title: "Chrome Dino",
        description: "Dodge the obstacles that come your way",
        image: "images/game-thumbnails/ChromeDino.png",
        link: "games/ChromeDino/index.html",
        tags: ["Infinite", "Platformer"],
        rating: 5
    },
    {
        title: "Polytrack",
        description: "Race the Tracks and Improve Your Best.",
        image: "images/game-thumbnails/polytrack.jpeg",
        link: "games/poly track/index.html",
        tags: ["Skill", "Timed"],
        rating: 5
    },
    {
        title: "Gladihoppers",
        description: "Fight to be the strongest in the Ancient Roman Empire.",
        image: "images/game-thumbnails/Gladihoppers.jpg",
        link: "games/Gladihoppers/index.html",
        tags: ["Skill", "RPG"],
        rating: 5
    }
];

// Initialize particles
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#00ff88' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 }
    }
});

// DOM elements
const gameContainer = document.getElementById('gameContainer');
const searchInput = document.getElementById('search');
const loadingScreen = document.getElementById('loading');

// Initialize games
function initGames() {
    gameContainer.innerHTML = games.map(game => `
        <div class="game-card" onclick="window.location.href='${game.link}'">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h2 class="game-title">${game.title}</h2>
                <div class="rating">
                    ${'<i class="fas fa-star"></i>'.repeat(game.rating)}
                </div>
                <p class="game-description">${game.description}</p>
                <div class="game-tags">
                    ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        const description = card.querySelector('.game-description').textContent.toLowerCase();
        card.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) 
            ? 'block' 
            : 'none';
    });
});

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        document.documentElement.style.setProperty('--primary', '#0066ff');
        document.documentElement.style.setProperty('--bg', 'linear-gradient(135deg, #f0f0f0, #ffffff)');
        document.documentElement.style.setProperty('--text', '#1a1a1a');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
    } else {
        document.documentElement.style.setProperty('--primary', '#00ff88');
        document.documentElement.style.setProperty('--bg', 'linear-gradient(135deg, #1a1a1a, #2d2d2d)');
        document.documentElement.style.setProperty('--text', '#ffffff');
        document.documentElement.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.8)');
    }
}

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
    }, 1000);
});

// Initialize
initGames();
