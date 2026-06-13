const isLoginPage = document.querySelector('.login_card') !== null;
const isHomePage = document.querySelector('.navbar') !== null && !isLoginPage;
 
// =============================================
// HOME PAGE LOGIC
// =============================================
 
if (isHomePage) {
    const loginBtn = document.querySelector('.loginbtn');
 
    // Cek apakah user udah login (ada email di sessionStorage)
    const savedEmail = sessionStorage.getItem('userEmail');
 
    if (savedEmail) {
        // Ambil kata pertama sebelum titik pertama atau @ (misal: mancing.mania@gmail.com → mancing)
        const firstName = savedEmail.split('@')[0].split('.')[0];
        loginBtn.textContent = firstName;
        loginBtn.style.cursor = 'default';
    } else {
        // Kalau belum login, klik login → pergi ke login page
        loginBtn.addEventListener('click', function () {
            window.location.href = 'loginpage.html'; // ganti sesuai nama file login kamu
        });
    }
}
 
// =============================================
// LOGIN PAGE LOGIC
// =============================================
 
if (isLoginPage) {
    const loginUserBtn = document.querySelector('.loginuser');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
 
    // Buat elemen error message sekali, taruh setelah emailpassword div
    const emailpasswordDiv = document.querySelector('.emailpassword');
 
    const errorMsg = document.createElement('p');
    errorMsg.id = 'error-msg';
    errorMsg.style.cssText = `
        color: #fff;
        background-color: #c0392b;
        padding: 8px 12px;
        margin-top: 8px;
        border-radius: 4px;
        font-size: 13px;
        display: none;
    `;
    emailpasswordDiv.insertAdjacentElement('afterend', errorMsg);
 
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
 
    function hideError() {
        errorMsg.style.display = 'none';
    }
 
    loginUserBtn.addEventListener('click', function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
 
        // Validasi tidak kosong
        if (!email && !password) {
            showError('Email dan password tidak boleh kosong!');
            return;
        }
 
        if (!email) {
            showError('Email tidak boleh kosong!');
            return;
        }
 
        if (!password) {
            showError('Password tidak boleh kosong!');
            return;
        }
 
        // Validasi harus @gmail.com
        if (!email.endsWith('@binus.ac.id')) {
            showError('Email hanya bisa menggunakan @binus.ac.id!');
            return;
        }
 
        // Semua valid, hilangkan error
        hideError();
 
        // Simpan email ke sessionStorage
        sessionStorage.setItem('userEmail', email);
 
        // Redirect balik ke home page
        window.location.href = 'homepage.html'; // ganti sesuai nama file home kamu
    });
 
    // Hapus error saat user mulai ngetik lagi
    emailInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
}

function toggleChip(el){ el.classList.toggle('active') }
function handleOverlayClick(e){
  if(!document.getElementById('filterPanel').contains(e.target)){
    document.getElementById('filterOverlay').classList.remove('active')
  }
}
function openFilter()  { document.getElementById('fpOverlay').classList.add('open'); }
  function closeFilter() { document.getElementById('fpOverlay').classList.remove('open'); }
  function closeOnOverlay(e) { if (e.target === document.getElementById('fpOverlay')) closeFilter(); }
  function toggleChip(el) { el.classList.toggle('active'); }
  function applyFilter() { closeFilter(); }
  function resetFilter() {
    document.querySelectorAll('.fp-chip').forEach(c => c.classList.remove('active'));
    resetYearPicker('startYearPicker', 2022);
    resetYearPicker('endYearPicker', 2025);
  }

  function buildYearPicker(containerId, selectedVal) {
    const el = document.getElementById(containerId);
    for (let y = 2018; y <= 2026; y++) {
      const btn = document.createElement('button');
      btn.className = 'year-chip' + (y === selectedVal ? ' active' : '');
      btn.textContent = y;
      btn.dataset.year = y;
      btn.onclick = function() {
        if (el._dragging) return;
        el.querySelectorAll('.year-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      el.appendChild(btn);
    }

    let isDown = false, startX, scrollLeft;
    el.addEventListener('mousedown', e => {
      isDown = true; el._dragging = false;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    });
    el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = 'grab'; });
    el.addEventListener('mouseup', () => {
      isDown = false; el.style.cursor = 'grab';
      setTimeout(() => { el._dragging = false; }, 0);
    });
    el.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      if (Math.abs(walk) > 4) el._dragging = true;
      el.scrollLeft = scrollLeft - walk;
    });

    let touchStartX, touchScrollLeft;
    el.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = el.scrollLeft;
    }, { passive: true });
    el.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX;
      el.scrollLeft = touchScrollLeft + (touchStartX - x) * 1.2;
    }, { passive: true });
  }

  function resetYearPicker(containerId, defaultVal) {
    document.getElementById(containerId).querySelectorAll('.year-chip').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.year) === defaultVal);
    });
  }

  buildYearPicker('startYearPicker', 2022);
  buildYearPicker('endYearPicker', 2025);

  const collectionTypeSelect = document.querySelector('.field-group:nth-child(2) .field-select');
const secondField = document.querySelector('.field-group:nth-child(3)');

function updateSecondField(value) {
  if (value === 'Collection Type') {
    secondField.innerHTML = `
      <select class="field-select">
        <option>Textbook</option>
        <option>E-book</option>
        <option>Journal</option>
      </select>`;
  } else {
    secondField.innerHTML = `
      <input type="text" class="field-input" placeholder="Type ${value} here...">`;
  }
}

if (collectionTypeSelect) {
  collectionTypeSelect.addEventListener('change', function () {
    updateSecondField(this.value);
  });
}

/*reservation */
const units = {
    discussion: ['Discussion Room 1', 'Discussion Room 2'],
    theater: ['Mini Theater']
  };

  function updateUnit() {
    const type = document.getElementById('res-type').value;
    const sel = document.getElementById('res-unit');
    sel.innerHTML = '';
    sel.disabled = false;
    units[type].forEach(u => {
      const o = document.createElement('option');
      o.value = u;
      o.textContent = u;
      sel.appendChild(o);
    });
  }

  function handleCancel() {
    if (confirm('Reset semua isian form?')) {
      document.getElementById('res-date').value = '';
      document.getElementById('res-location').selectedIndex = 0;
      document.getElementById('res-type').selectedIndex = 0;
      const sel = document.getElementById('res-unit');
      sel.innerHTML = '<option value="" disabled selected>Pilih tipe dulu</option>';
      sel.disabled = true;
      document.querySelectorAll('input[name=slot]').forEach(r => r.checked = false);
      document.getElementById('res-id').value = '';
      document.getElementById('res-name').value = '';
      document.getElementById('res-purpose').value = '';
    }
  }

  function handleSave() {
    const date = document.getElementById('res-date').value;
    const loc = document.getElementById('res-location').value;
    const type = document.getElementById('res-type').value;
    const unit = document.getElementById('res-unit').value;
    const slot = document.querySelector('input[name=slot]:checked');
    const mid = document.getElementById('res-id').value.trim();
    const name = document.getElementById('res-name').value.trim();
    const purpose = document.getElementById('res-purpose').value.trim();

    if (!date || !loc || !type || !unit || !slot || !mid || !name || !purpose) {
      alert('Mohon lengkapi semua field sebelum menyimpan.');
      return;
    }

    alert(`✅ Reservasi berhasil disimpan!\n\n📅 ${date}\n📍 ${loc}\n🏠 ${unit} (${slot.value})\n👤 ${name} (${mid})\n📝 ${purpose}`);
  }