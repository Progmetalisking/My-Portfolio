// ==========================================================================
// CYBERPUNK HUD & HACKERRANK TELEMETRY INTERACTIVITY
// Developer: Kompalli Shashank Nag (CSE IoT - BIT Bangalore)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. HUD CROSSHAIR & SPARKLE CANVAS ENGINE
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('hud-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ['#00F0FF', '#F59E0B', '#7ee787', '#ffffff'];

    class HudParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        this.size *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        
        // Draw tech pixel/diamond
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.restore();
      }
    }

    let mouseX = -100;
    let mouseY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (Math.random() < 0.65) {
        particles.push(new HudParticle(mouseX, mouseY));
      }
    });

    // Touch support for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        particles.push(new HudParticle(mouseX, mouseY));
      }
    });

    function renderHud() {
      ctx.clearRect(0, 0, width, height);

      // Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0 || particles[i].size <= 0.4) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(renderHud);
    }

    renderHud();
  }

  // --------------------------------------------------------------------------
  // 2. LIVE SIMULATED IOT TELEMETRY FEED (HackerRank Widget)
  // --------------------------------------------------------------------------
  const telemetryFeed = document.getElementById('telemetry-feed');
  if (telemetryFeed) {
    const initialLogs = [
      { time: '12:00:01', topic: 'sys/init', json: '{"node":"BIT_BLR_01","firmware":"v2.4.9","state":"READY"}' },
      { time: '12:00:03', topic: 'net/mqtt', json: '{"broker":"broker.hivemq.com","port":1883,"conn":"ESTABLISHED"}' },
      { time: '12:00:06', topic: 'bit/iot/sensor', json: '{"temp":24.60,"hum":58.2,"rssi":-62,"status":"NOMINAL"}' },
      { time: '12:00:09', topic: 'bit/iot/sensor', json: '{"temp":24.65,"hum":58.0,"rssi":-60,"status":"NOMINAL"}' }
    ];

    function appendFeedLine(time, topic, json, isWarn = false) {
      const line = document.createElement('div');
      line.className = 'feed-line';
      line.innerHTML = `
        <span class="feed-time">[${time}]</span>
        <span class="feed-topic">${topic}:</span>
        <span class="feed-json ${isWarn ? 'feed-warn' : ''}">${json}</span>
      `;
      telemetryFeed.appendChild(line);
      telemetryFeed.scrollTop = telemetryFeed.scrollHeight;
    }

    initialLogs.forEach(log => appendFeedLine(log.time, log.topic, log.json));

    // Periodic live telemetry streaming
    setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const temp = (24.4 + Math.random() * 0.8).toFixed(2);
      const hum = (57.5 + Math.random() * 1.5).toFixed(1);
      const rssi = Math.floor(-58 - Math.random() * 8);

      appendFeedLine(timeStr, 'bit/iot/telemetry', `{"temp":${temp},"hum":${hum},"rssi":${rssi},"node":"BIT_CSE_01"}`);

      // Keep buffer clean (max 20 lines)
      if (telemetryFeed.children.length > 20) {
        telemetryFeed.removeChild(telemetryFeed.firstChild);
      }
    }, 3200);

    // Ping Node Button
    const pingBtn = document.getElementById('ping-node-btn');
    const pingResult = document.getElementById('ping-result');
    if (pingBtn && pingResult) {
      pingBtn.addEventListener('click', () => {
        pingBtn.disabled = true;
        pingBtn.textContent = 'TRANSMITTING ECHO...';
        const now = new Date().toTimeString().split(' ')[0];

        setTimeout(() => {
          const latency = Math.floor(11 + Math.random() * 7);
          pingResult.textContent = `RTT: ${latency}ms • LOSS: 0.0% [BIT_NODE_ACK]`;
          appendFeedLine(now, 'sys/ping', `{"event":"ECHO_REPLY","rtt_ms":${latency},"gateway":"10.0.4.1"}`, false);
          pingBtn.textContent = '⚡ PING BIT_IOT_NODE';
          pingBtn.disabled = false;
        }, 550);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 3. TERMINAL CODE / TELEMETRY TAB SWITCHING
  // --------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const viewports = document.querySelectorAll('.terminal-viewport');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      viewports.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const targetViewport = document.getElementById(`tab-${targetTab}`);
      if (targetViewport) targetViewport.classList.add('active');
    });
  });

  // --------------------------------------------------------------------------
  // 4. HACKERRANK-STYLE PROJECT FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-hud-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. LIVE SYSTEM UPTIME COUNTER
  // --------------------------------------------------------------------------
  const uptimeEl = document.getElementById('uptime-counter');
  if (uptimeEl) {
    let seconds = 22;
    let minutes = 14;
    let hours = 428;

    setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
      uptimeEl.textContent = `${hours}h:${minutes < 10 ? '0' : ''}${minutes}m:${seconds < 10 ? '0' : ''}${seconds}s`;
    }, 1000);
  }

  // --------------------------------------------------------------------------
  // 6. COPY EMAIL ACTION (Clipboard HUD Feedback)
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'shashanknagkompalli@gmail.com';

      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyText.textContent;
        copyText.textContent = 'COPIED TO CLIPBOARD // OK [✓]';
        copyBtn.style.borderColor = '#00F0FF';
        copyBtn.style.color = '#00F0FF';
        copyBtn.style.boxShadow = '0 0 16px rgba(0, 240, 255, 0.4)';

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

        copyText.textContent = 'COPIED TO CLIPBOARD // OK [✓]';
        setTimeout(() => {
          copyText.textContent = 'COPY EMAIL [CLIPBOARD]';
        }, 2000);
      }
    });
  }

  // Dossier notice
  const dossierBtn = document.getElementById('dossier-btn');
  if (dossierBtn) {
    dossierBtn.addEventListener('click', (e) => {
      console.log('[HUD] Dossier requested. Ready for PDF link.');
    });
  }
});
