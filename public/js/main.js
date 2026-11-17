// ==========================================================================
// PORTFOLIO CLIENT-SIDE SCRIPT: Sparkle Cursor Trail & Interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. SPARKLY CURSOR TRAIL EFFECT (Canvas-based)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('sparkle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const sparkles = [];
    const colors = ['#38bdf8', '#818cf8', '#7dd3fc', '#ffffff', '#c084fc'];

    class Sparkle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // Particle size
        this.speedX = (Math.random() - 0.5) * 1.8;
        this.speedY = (Math.random() - 0.5) * 1.8 - 0.5; // Slight upward drift
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        this.decay = Math.random() * 0.025 + 0.015; // Fade speed
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.spin;
        this.alpha -= this.decay;
        this.size *= 0.96; // Shrink
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;

        // Draw a 4-point glittering star
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
          ctx.lineTo(
            Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.35),
            Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.35)
          );
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    let lastX = null;
    let lastY = null;

    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Spawn 2-3 sparkles per mouse move
      const count = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < count; i++) {
        sparkles.push(new Sparkle(mouseX, mouseY));
      }

      lastX = mouseX;
      lastY = mouseY;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        sparkles.push(new Sparkle(touch.clientX, touch.clientY));
      }
    });

    function animateSparkles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].update();
        sparkles[i].draw();

        if (sparkles[i].alpha <= 0 || sparkles[i].size <= 0.5) {
          sparkles.splice(i, 1);
        }
      }

      requestAnimationFrame(animateSparkles);
    }

    animateSparkles();
  }

  // --------------------------------------------------------------------------
  // 2. INTERACTIVE "COPY EMAIL" BUTTON
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'shashanknagkompalli@gmail.com';

      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyText.textContent;
        copyText.textContent = 'Copied to Clipboard! ✓';
        copyBtn.style.borderColor = '#38bdf8';
        copyBtn.style.color = '#38bdf8';
        copyBtn.style.boxShadow = '0 0 16px rgba(56, 189, 248, 0.4)';

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
          copyBtn.style.boxShadow = '';
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyText.textContent = 'Copied! ✓';
        setTimeout(() => {
          copyText.textContent = 'Copy Email';
        }, 2000);
      }
    });
  }
});
