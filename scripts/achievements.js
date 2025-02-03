import { auth, db } from './firebase.js';
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ACHIEVEMENTS = {
  FIRST_GAME: { id: 'first-game', title: 'Novice Player' },
  FIVE_STARS: { id: 'five-stars', title: 'Star Collector' }
};

export async function unlockAchievement(achievementId) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    achievements: arrayUnion(achievementId)
  });
}

// Check on game completion
export function checkGameCompletion(gameId) {
  const gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed') || '[]');
  
  if (!gamesPlayed.includes(gameId)) {
    unlockAchievement(ACHIEVEMENTS.FIRST_GAME.id);
    localStorage.setItem('gamesPlayed', JSON.stringify([...gamesPlayed, gameId]));
  }
}
