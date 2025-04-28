const bgMusic = document.getElementById('bg-music');

// Set the working music source
bgMusic.src = 'https://soundcloud.com/chriscollinsiscreative/cosmic-harmony';

// Wait for user interaction (click or touch) to start music
function startMusic() {
  bgMusic.play().catch(e => {
    console.log("Music play failed:", e);
  });

  // Remove listener after playing
  document.removeEventListener('click', startMusic);
  document.removeEventListener('touchstart', startMusic);
}

// Listen for interaction
document.addEventListener('click', startMusic);
document.addEventListener('touchstart', startMusic);
