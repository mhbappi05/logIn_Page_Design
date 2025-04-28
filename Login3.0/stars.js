const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let w, h;
let stars = [];
let shootingStars = [];
let spaceships = [];
let explosions = [];
let comets = [];
let planets = [];
let satellites = [];
let nebulas = [];
let maxStars = 1000;

// Initialize everything
function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  stars = [];
  shootingStars = [];
  spaceships = [];
  explosions = [];
  comets = [];
  planets = [];
  satellites = [];
  nebulas = [];

  // Create stars
  for (let i = 0; i < maxStars; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
      speed: Math.random() * 0.5
    });
  }

  // Create planets
  const numberOfPlanets = 5;
  for (let i = 0; i < numberOfPlanets; i++) {
    planets.push({
      x: Math.random() * w,
      y: Math.random() * h / 2,
      radius: Math.random() * 30 + 30,
      color: getRandomPlanetColor(),
      floatSpeed: Math.random() * 0.5 + 0.2,
      floatDirection: Math.random() < 0.5 ? 1 : -1
    });
  }

  // Create satellites for each planet
  planets.forEach(planet => {
    satellites.push({
      planet: planet,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: planet.radius + 20 + Math.random() * 20,
      speed: Math.random() * 0.01 + 0.005
    });
  });

  // Create nebulas
  for (let i = 0; i < 3; i++) {
    nebulas.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 200 + 150,
      color: getRandomNebulaColor(),
      speedX: Math.random() * 0.2 - 0.1,
      speedY: Math.random() * 0.2 - 0.1,
      opacity: Math.random() * 0.2 + 0.1
    });
  }
}

function getRandomPlanetColor() {
  const colors = ['#4CAF50', '#00BCD4', '#FFC107', '#FF5722', '#9C27B0', '#3F51B5'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomNebulaColor() {
  const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff6600', '#cc00cc'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create shooting star
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * w,
    y: 0,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 10 + 6,
    angle: Math.random() * Math.PI / 4 + Math.PI / 4,
    opacity: 1
  });
}

// Create spaceship
function createSpaceship() {
  spaceships.push({
    x: -100,
    y: Math.random() * h / 2,
    speed: Math.random() * 2 + 1,
    size: Math.random() * 20 + 30
  });
}

// Create rainbow comet
function createComet() {
  comets.push({
    x: -200,
    y: Math.random() * h / 2,
    speed: 5,
    tailLength: 200,
    opacity: 1
  });
}

// Explosion (click)
function createExplosion(x, y) {
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: x,
      y: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      alpha: 1
    });
  }
  explosions.push(particles);
}

// Handle clicks
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  createExplosion(x, y);
});

// Animate Everything
function animate() {
  ctx.clearRect(0, 0, w, h);

  // Draw nebulas
  nebulas.forEach(nebula => {
    ctx.globalAlpha = nebula.opacity;
    ctx.beginPath();
    ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
    ctx.fillStyle = nebula.color;
    ctx.fill();
    nebula.x += nebula.speedX;
    nebula.y += nebula.speedY;

    if (nebula.x > w + 200) nebula.x = -200;
    if (nebula.x < -200) nebula.x = w + 200;
    if (nebula.y > h + 200) nebula.y = -200;
    if (nebula.y < -200) nebula.y = h + 200;
  });

  // Planets
  planets.forEach(planet => {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    planet.y += planet.floatSpeed * planet.floatDirection;
    if (planet.y > h/2 + 50 || planet.y < h/2 - 50) {
      planet.floatDirection *= -1;
    }
  });

  // Satellites
  satellites.forEach(satellite => {
    const planet = satellite.planet;
    satellite.angle += satellite.speed;
    const satX = planet.x + satellite.orbitRadius * Math.cos(satellite.angle);
    const satY = planet.y + satellite.orbitRadius * Math.sin(satellite.angle);
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(satX, satY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });

  // Stars
  ctx.fillStyle = '#ffffff';
  ctx.shadowBlur = 5;
  ctx.shadowColor = 'white';
  stars.forEach(star => {
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
    ctx.fill();
    star.y -= star.speed;
    if (star.y < 0) {
      star.y = h;
      star.x = Math.random() * w;
    }
  });

  // Shooting Stars
  shootingStars.forEach((shootingStar, index) => {
    ctx.globalAlpha = shootingStar.opacity;
    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.length * Math.cos(shootingStar.angle),
      shootingStar.y - shootingStar.length * Math.sin(shootingStar.angle)
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    shootingStar.x += shootingStar.speed * Math.cos(shootingStar.angle);
    shootingStar.y += shootingStar.speed * Math.sin(shootingStar.angle);
    shootingStar.opacity -= 0.01;

    if (shootingStar.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });

  // Spaceships
  spaceships.forEach((ship, index) => {
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y);
    ctx.lineTo(ship.x + ship.size, ship.y + ship.size / 2);
    ctx.lineTo(ship.x, ship.y + ship.size);
    ctx.closePath();
    ctx.fillStyle = 'cyan';
    ctx.fill();
    ship.x += ship.speed;
    ship.y += Math.sin(ship.x * 0.02) * 1;

    if (ship.x > w + 100) {
      spaceships.splice(index, 1);
    }
  });

  // Explosions
  explosions.forEach((particles, expIndex) => {
    particles.forEach((p, index) => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;
      if (p.alpha <= 0) {
        particles.splice(index, 1);
      }
    });
    if (particles.length === 0) {
      explosions.splice(expIndex, 1);
    }
  });

  // Comets
  comets.forEach((comet, index) => {
    const gradient = ctx.createLinearGradient(comet.x, comet.y, comet.x - comet.tailLength, comet.y);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.2, 'red');
    gradient.addColorStop(0.4, 'orange');
    gradient.addColorStop(0.6, 'yellow');
    gradient.addColorStop(0.8, 'green');
    gradient.addColorStop(1, 'blue');
    ctx.globalAlpha = comet.opacity;
    ctx.beginPath();
    ctx.moveTo(comet.x, comet.y);
    ctx.lineTo(comet.x - comet.tailLength, comet.y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    comet.x += comet.speed;
    comet.opacity -= 0.001;
    if (comet.x > w + 300 || comet.opacity <= 0) {
      comets.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Timed Effects
setInterval(() => createShootingStar(), Math.random() * 3000 + 4000);
setInterval(() => createSpaceship(), Math.random() * 4000 + 8000);
setInterval(() => createComet(), 30000);

window.addEventListener('resize', init);

// Start animation
init();
animate();
