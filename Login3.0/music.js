const bgMusic = document.getElementById('bg-music');
    bgMusic.src = 'music.mp3'; // Ensure correct path

    const catcher = document.getElementById('click-catcher');
    const clickText = document.getElementById('click-text');

    function startMusic() {
      bgMusic.play()
        .then(() => {
          console.log('Music started playing');
          catcher.style.display = 'none'; // Remove full page click catcher
          clickText.style.display = 'none'; // Hide the text prompt
        })
        .catch(e => {
          console.log('Music play failed:', e);
          alert('Failed to play music. Please try clicking again.');
        });

      catcher.removeEventListener('click', startMusic);
      clickText.removeEventListener('click', startMusic);
    }

    catcher.addEventListener('click', startMusic);
    clickText.addEventListener('click', startMusic);