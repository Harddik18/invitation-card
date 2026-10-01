// Open Envelope Function
function openInvitation() {
  const envelope = document.getElementById('envelope-screen');
  const card = document.getElementById('card-screen');

  envelope.style.opacity = '0';
  envelope.style.transform = 'scale(1.1)';
  
  setTimeout(() => {
    envelope.classList.add('hidden');
    card.classList.remove('hidden');
    fireConfetti();
  }, 400);
}

// Countdown Timer to October 25, 2026 19:00:00
const eventDate = new Date('2026-10-25T19:00:00+05:30').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = "<div class='text-gold font-bold'>The Celebration Has Begun!</div>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = String(days).padStart(2, '0');
  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('mins').innerText = String(mins).padStart(2, '0');
  document.getElementById('secs').innerText = String(secs).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Modal Handlers
function showRsvpModal() {
  document.getElementById('rsvp-modal').classList.remove('hidden');
}

function closeRsvpModal() {
  document.getElementById('rsvp-modal').classList.add('hidden');
}

function submitRsvp(e) {
  e.preventDefault();
  const form = document.getElementById('rsvp-form');
  const successBox = document.getElementById('rsvp-success');

  form.classList.add('hidden');
  successBox.classList.remove('hidden');
  fireConfetti();
}

// Simple Festive Canvas Confetti
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#d4af37', '#f3e5ab', '#ffffff', '#38bdf8', '#ef4444'];

  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10
    });
  }

  let frames = 0;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.rSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 120) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  render();
}
