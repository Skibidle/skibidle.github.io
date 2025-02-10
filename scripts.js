// scripts.js
function filterSelection(category) {
    const cards = document.querySelectorAll('.article-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.toLowerCase() === category) btn.classList.add('active');
    });

    cards.forEach(card => {
        const categories = card.dataset.categories.split(' ');
        if(category === 'all' || categories.includes(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchArticles() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach(card => {
        const searchData = card.dataset.search.toLowerCase();
        if(searchData.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('input', searchArticles);
});
