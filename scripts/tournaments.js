import { watchLeaderboard } from './firebase.js';

let activeTournament = null;

export async function loadActiveTournament() {
  const response = await fetch('tournaments.json');
  const tournaments = await response.json();
  activeTournament = tournaments.active;
  updateTournamentUI();
}

function updateTournamentUI() {
  const banner = document.getElementById('tournament-banner');
  if (!activeTournament) {
    banner.style.display = 'none';
    return;
  }

  banner.innerHTML = `
    <h3>🏆 ${activeTournament.name}</h3>
    <p>${activeTournament.description}</p>
    <div id="tournament-leaderboard"></div>
  `;

  watchLeaderboard(activeTournament.gameId, scores => {
    document.getElementById('tournament-leaderboard').innerHTML = scores
      .map((score, index) => `${index + 1}. ${score.name}: ${score.points}`)
      .join('<br>');
  });
}
