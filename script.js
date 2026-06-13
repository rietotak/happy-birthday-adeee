// ======================= JAVASCRIPT (PIN, GAMBAR, MUSIK, KALENDER, CONFETTI, ANIMASI BUNGA) =======================
(function() {
  // ---------- KONSTANTA & DOM ----------
  const CORRECT_PIN = "190610";
  let enteredPin = "";
  
  // DOM Elements
  const pinScreen = document.getElementById('pinScreen');
  const birthdayScreen = document.getElementById('birthdayContent');
  const keypadContainer = document.getElementById('pinKeypad');
  const cakeBtn = document.getElementById('cakeKlik');
  const namaEl = document.getElementById('namaTampil');
  const pinContainer = document.querySelector('.pin-container');
  
  // Audio element dari file Anda
  const audioElement = document.getElementById('birthdayAudio');
  
  namaEl.innerText = "✨ Sayang Tersayang ✨";
  
  // Daftar bunga dan kelopak untuk animasi
  const flowers = ['🌸', '🌼', '🌻', '🌺', '🌸', '🌸', '🌷', '🌸', '💐', '🌹', '🥀', '🌼', '🌸', '✨', '🌸', '🌼', '🌺', '🌻', '🌸', '💮'];
  const petals = ['🌸', '🌼', '🌸', '🌷', '🍃', '🌸', '💮', '🏵️', '🌺', '🌻'];
  
  // ========== FUNGSI PLAY AUDIO DARI FILE ANDA ==========
  let isAudioPlaying = false;
  
  function playUserAudio() {
    if (audioElement) {
      audioElement.play().then(() => {
        isAudioPlaying = true;
        console.log("Audio berhasil diputar");
      }).catch((error) => {
        console.log("Autoplay diblokir, menunggu interaksi user:", error);
        // Audio akan diputar saat user berinteraksi
      });
    }
  }
  
  function stopUserAudio() {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      isAudioPlaying = false;
    }
  }
  
  // ========== FUNGSI ANIMASI BUNGA ==========
  function getRandomTrajectory(baseX, baseY, index, total) {
    const angle = (index / total) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 80 + Math.random() * 120;
    const xOffset = Math.cos(angle) * radius;
    const yOffset = Math.sin(angle) * radius - 70;
    
    const tx1 = xOffset * 0.2;
    const ty1 = yOffset * 0.3 - 20;
    const tx2 = xOffset * 0.5;
    const ty2 = yOffset * 0.6 - 40;
    const tx3 = xOffset * 0.8;
    const ty3 = yOffset * 0.8 - 60;
    const tx4 = xOffset;
    const ty4 = yOffset - 90;
    
    const rot1 = Math.random() * 90 - 45;
    const rot2 = Math.random() * 180 - 90;
    const rot3 = Math.random() * 270 - 135;
    const rot4 = Math.random() * 360 - 180;
    
    return { tx1, ty1, tx2, ty2, tx3, ty3, tx4, ty4, rot1, rot2, rot3, rot4 };
  }
  
  function createFlower(x, y, index, total) {
    const flowerDiv = document.createElement('div');
    flowerDiv.className = 'floating-flower';
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    flowerDiv.textContent = randomFlower;
    const startX = x + (Math.random() - 0.5) * 50;
    const startY = y + (Math.random() - 0.5) * 40;
    flowerDiv.style.left = startX + 'px';
    flowerDiv.style.top = startY + 'px';
    const traj = getRandomTrajectory(startX, startY, index, total);
    flowerDiv.style.setProperty('--tx1', traj.tx1 + 'px');
    flowerDiv.style.setProperty('--ty1', traj.ty1 + 'px');
    flowerDiv.style.setProperty('--tx2', traj.tx2 + 'px');
    flowerDiv.style.setProperty('--ty2', traj.ty2 + 'px');
    flowerDiv.style.setProperty('--tx3', traj.tx3 + 'px');
    flowerDiv.style.setProperty('--ty3', traj.ty3 + 'px');
    flowerDiv.style.setProperty('--tx4', traj.tx4 + 'px');
    flowerDiv.style.setProperty('--ty4', traj.ty4 + 'px');
    flowerDiv.style.setProperty('--rot1', traj.rot1 + 'deg');
    flowerDiv.style.setProperty('--rot2', traj.rot2 + 'deg');
    flowerDiv.style.setProperty('--rot3', traj.rot3 + 'deg');
    flowerDiv.style.setProperty('--rot4', traj.rot4 + 'deg');
    document.body.appendChild(flowerDiv);
    setTimeout(() => { if (flowerDiv && flowerDiv.remove) flowerDiv.remove(); }, 1600);
  }
  
  function createPetal(x, y) {
    const petalDiv = document.createElement('div');
    petalDiv.className = 'floating-petal';
    const randomPetal = petals[Math.floor(Math.random() * petals.length)];
    petalDiv.textContent = randomPetal;
    petalDiv.style.left = x + (Math.random() - 0.5) * 70 + 'px';
    petalDiv.style.top = y + (Math.random() - 0.5) * 50 + 'px';
    const endX = (Math.random() - 0.5) * 350;
    const endY = -180 - Math.random() * 120;
    const endRotate = Math.random() * 360 - 180;
    petalDiv.style.setProperty('--endX', endX + 'px');
    petalDiv.style.setProperty('--endY', endY + 'px');
    petalDiv.style.setProperty('--endRotate', endRotate + 'deg');
    document.body.appendChild(petalDiv);
    setTimeout(() => { if (petalDiv && petalDiv.remove) petalDiv.remove(); }, 1300);
  }
  
  function burstFlowersAndPetals() {
    const cakeRect = cakeBtn.getBoundingClientRect();
    const cakeCenterX = cakeRect.left + cakeRect.width / 2;
    const cakeCenterY = cakeRect.top + cakeRect.height / 2;
    const flowerCount = 24;
    for (let i = 0; i < flowerCount; i++) {
      setTimeout(() => { createFlower(cakeCenterX, cakeCenterY, i, flowerCount); }, i * 30);
    }
    const petalCount = 50;
    for (let i = 0; i < petalCount; i++) {
      setTimeout(() => { createPetal(cakeCenterX, cakeCenterY); }, i * 20);
    }
  }
  
  function animateCake() {
    cakeBtn.classList.add('cake-animate');
    setTimeout(() => { cakeBtn.classList.remove('cake-animate'); }, 300);
  }
  
  // ========== FUNGSI PIN (DOTS & LOGIKA) - TANPA PETUNJUK ==========
  function updatePinDots() {
    const dots = document.querySelectorAll('#pinDotsArea .pin-dot');
    for (let i = 0; i < dots.length; i++) {
      if (i < enteredPin.length) dots[i].classList.add('filled');
      else dots[i].classList.remove('filled');
    }
  }
  
  function shakePinContainer() {
    if (pinContainer) {
      pinContainer.classList.add('pin-shake');
      setTimeout(() => {
        pinContainer.classList.remove('pin-shake');
      }, 300);
    }
  }
  
  function checkAndUnlock() {
    if (enteredPin === CORRECT_PIN) {
      pinScreen.style.display = 'none';
      birthdayScreen.style.display = 'block';
      generateJune2026Calendar();
      startWelcomeConfetti();
      // Putar audio dari file Anda
      playUserAudio();
    } else if (enteredPin.length === 6 && enteredPin !== CORRECT_PIN) {
      alert("❌ PIN Salah");
      enteredPin = "";
      updatePinDots();
      shakePinContainer();
    }
  }
  
  function addDigit(digit) {
    if (enteredPin.length < 6) {
      enteredPin += digit;
      updatePinDots();
      if (enteredPin.length === 6) {
        checkAndUnlock();
      }
    }
  }
  
  function deleteLastDigit() {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDots();
  }
  
  function buildKeypad() {
    const keypadLayout = [
      { val: '1', type: 'num' }, { val: '2', type: 'num' }, { val: '3', type: 'num' },
      { val: '4', type: 'num' }, { val: '5', type: 'num' }, { val: '6', type: 'num' },
      { val: '7', type: 'num' }, { val: '8', type: 'num' }, { val: '9', type: 'num' },
      { val: '⌫', type: 'del' }, { val: '0', type: 'num' }, { val: '✓', type: 'enter' }
    ];
    keypadContainer.innerHTML = '';
    for (let btn of keypadLayout) {
      const keyDiv = document.createElement('div');
      keyDiv.classList.add('pin-key');
      if (btn.type === 'del') {
        keyDiv.innerHTML = '⌫';
        keyDiv.classList.add('key-special', 'key-delete');
        keyDiv.onclick = () => deleteLastDigit();
      } else if (btn.type === 'enter') {
        keyDiv.innerHTML = '✓';
        keyDiv.classList.add('key-special');
        keyDiv.onclick = () => { 
          if (enteredPin.length === 6) checkAndUnlock(); 
          else if (enteredPin.length < 6) alert("PIN harus 6 digit!");
        };
      } else {
        keyDiv.innerHTML = btn.val;
        keyDiv.onclick = () => addDigit(btn.val);
      }
      keypadContainer.appendChild(keyDiv);
    }
  }
  
  // ========== KALENDER JUNI 2026 YANG BENAR ==========
  function generateJune2026Calendar() {
    const calContainer = document.getElementById('juneCalendar');
    if (!calContainer) return;
    
    const year = 2026;
    const month = 5; // Juni (0 = Januari)
    const firstDayOfMonth = new Date(year, month, 1);
    let startOffset = firstDayOfMonth.getDay() - 1;
    if (startOffset === -1) startOffset = 6;
    
    const daysInMonth = 30;
    const weekdays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    
    let html = `
      <div class="kalender-header">
        <h2>🗓️ Juni 2026 🗓️</h2>
        <p>Bulan Spesial Buat You 🥳</p>
      </div>
      <table class="calendar-table">
        <thead>
          <tr>
    `;
    
    for (let i = 0; i < 7; i++) {
      html += `<th>${weekdays[i]}</th>`;
    }
    
    html += `</thead><tbody>`;
    
    let dayCounter = 1;
    for (let row = 0; row < 6; row++) {
      html += "<tr>";
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < startOffset) {
          html += `<td class="empty"></td>`;
        } else if (dayCounter > daysInMonth) {
          html += `<td class="empty"></td>`;
        } else {
          const isBirthday = (dayCounter === 19);
          const cls = isBirthday ? 'birthday-highlight' : '';
          const content = isBirthday ? `${dayCounter} 🎉` : `${dayCounter}`;
          html += `<td class="${cls}">${content}</td>`;
          dayCounter++;
        }
      }
      html += "</tr>";
      if (dayCounter > daysInMonth) break;
    }
    
    html += `</tbody></table>`;
    calContainer.innerHTML = html;
  }
  
  function burstConfettiHeavy() {
    canvasConfetti({ particleCount: 220, spread: 95, origin: { y: 0.6 }, colors: ['#ff90ca', '#ffe5a3', '#ffb8d1', '#ff5b9c'] });
    canvasConfetti({ particleCount: 70, spread: 50, origin: { y: 0.45, x: 0.2 }, colors: ['#ffb347', '#ff7eb6'] });
    canvasConfetti({ particleCount: 80, spread: 65, origin: { y: 0.7, x: 0.8 }, colors: ['#ff69b4', '#ffda7c'] });
  }
  
  function startWelcomeConfetti() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        burstConfettiHeavy();
        if (cakeBtn) { cakeBtn.style.transform = 'scale(1.25)'; setTimeout(() => { if(cakeBtn) cakeBtn.style.transform = 'scale(1)'; }, 160); }
      }, i * 200);
    }
  }
  
  function cakeClickAction() {
    animateCake();
    burstConfettiHeavy();
    burstFlowersAndPetals();
    setTimeout(() => { canvasConfetti({ particleCount: 200, spread: 80, origin: { y: 0.5 }, colors: ['#ff1493', '#ff69b4', '#ffb6c1', '#ffd700'] }); }, 150);
    
    // Pastikan audio berjalan saat kue diklik jika belum
    if (audioElement && !isAudioPlaying) {
      playUserAudio();
    }
  }
  
  if (cakeBtn) cakeBtn.addEventListener('click', (e) => { e.stopPropagation(); cakeClickAction(); });
  
  // Interaksi user untuk mengaktifkan audio (karena browser memblokir autoplay)
  document.body.addEventListener('click', () => {
    if (birthdayScreen && birthdayScreen.style.display === 'block') {
      if (audioElement && !isAudioPlaying) {
        playUserAudio();
      }
    }
  }, { once: false });
  
  function init() {
    buildKeypad();
    updatePinDots();
    birthdayScreen.style.display = 'none';
    pinScreen.style.display = 'block';
  }
  
  init();
})();