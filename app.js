/**
 * VANGUARD BARBER CLUB & LOUNGE - Interactive Engine
 * High-Converting Sales Presentation Web for Barbershops
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Setup Opening Hours Live Status
  initLiveOpeningHours();

  // 3. Setup Before / After Transformation Slider
  initBeforeAfterSlider();

  // 4. Setup Pricing Tabs Filtering
  initPricingTabs();

  // 5. Setup Gallery Filtering & Lightbox
  initGalleryEngine();

  // 6. Setup Interactive Booking Engine
  initBookingEngine();

  // 7. Setup Live Gift Voucher Generator
  initVoucherGenerator();

  // 8. Setup Sales Pitch Modal for Barbershop Owners
  initSalesPitchEngine();

  // 9. Setup Social Proof Notification Toasts
  initSocialProofToasts();

  // 10. Setup Mobile Drawer Menu
  initMobileDrawer();

  // 11. Modern Web Guidance Fallback for Dialog light-dismiss
  initDialogFallbacks();
});

/* ==========================================================================
   1. LIVE OPENING HOURS STATUS (Dynamic Real-time calculation)
   ========================================================================== */
function initLiveOpeningHours() {
  const statusBadge = document.getElementById('liveStatusBadge');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const mobileStatusText = document.getElementById('mobileStatusText');

  function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    let isOpen = false;
    let message = '';
    let mobileMsg = '';

    if (day >= 1 && day <= 5) {
      // Mon - Fri: 9:00 - 20:00
      if (currentTime >= 9 && currentTime < 20) {
        isOpen = true;
        message = 'Dnes otevřeno do 20:00 • 2 volné termíny';
        mobileMsg = 'Otevřeno do 20:00 (Volné termíny na dnes)';
      } else if (currentTime < 9) {
        isOpen = false;
        message = 'Otevíráme dnes v 9:00';
        mobileMsg = 'Dnes otevíráme v 9:00';
      } else {
        isOpen = false;
        message = day === 5 ? 'Zavřeno • Otevíráme v sobotu v 9:00' : 'Zavřeno • Otevíráme zítra v 9:00';
        mobileMsg = 'Zavřeno • Otevíráme zítra v 9:00';
      }
    } else if (day === 6) {
      // Saturday: 9:00 - 17:00
      if (currentTime >= 9 && currentTime < 17) {
        isOpen = true;
        message = 'Sobotní provoz do 17:00';
        mobileMsg = 'Sobota: Otevřeno do 17:00';
      } else {
        isOpen = false;
        message = 'Zavřeno • Otevíráme v pondělí v 9:00';
        mobileMsg = 'Zavřeno • Otevíráme v pondělí v 9:00';
      }
    } else {
      // Sunday: Closed
      isOpen = false;
      message = 'Neděle zavřeno • Otevíráme zítra v 9:00';
      mobileMsg = 'Neděle zavřeno • Zítra od 9:00';
    }

    if (statusText) statusText.textContent = message;
    if (mobileStatusText) mobileStatusText.textContent = mobileMsg;

    if (statusDot) {
      if (isOpen) {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 live-pulse-green';
      } else {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-500';
      }
    }
  }

  updateStatus();
  // Refresh every 5 minutes
  setInterval(updateStatus, 300000);
}

/* ==========================================================================
   2. BEFORE / AFTER COMPARISON SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('transformationSlider');
  const overlay = document.getElementById('sliderOverlay');
  const handle = document.getElementById('sliderHandle');
  const beforeImg = document.getElementById('beforeImgTag');

  if (!container || !overlay || !handle || !beforeImg) return;

  function setSliderPosition(percentage) {
    const clamped = Math.max(0, Math.min(100, percentage));
    overlay.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
  }

  // Sync internal beforeImg width with container to avoid stretching
  function syncImgWidth() {
    const width = container.offsetWidth;
    beforeImg.style.width = `${width}px`;
  }

  window.addEventListener('resize', syncImgWidth);
  syncImgWidth();

  let isDragging = false;

  function getPercentage(clientX) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  }

  // Pointer & Touch Events
  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    container.setPointerCapture(e.pointerId);
    setSliderPosition(getPercentage(e.clientX));
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    setSliderPosition(getPercentage(e.clientX));
  });

  const stopDragging = (e) => {
    if (isDragging) {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  container.addEventListener('pointerup', stopDragging);
  container.addEventListener('pointercancel', stopDragging);

  // Set default initial position
  setSliderPosition(50);
}

/* ==========================================================================
   3. PRICING TABS FILTERING
   ========================================================================== */
function initPricingTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.pricing-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.category;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. GALLERY & LIGHTBOX ENGINE
   ========================================================================== */
function initGalleryEngine() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const dialog = document.getElementById('lightboxDialog');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const desc = document.getElementById('lightboxDesc');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'gallery-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-[#181824] text-zinc-300 hover:text-white border border-white/10';
      });
      btn.className = 'gallery-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-[#d4a745] text-black shadow';

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  window.galleryEngine = {
    openLightbox: (src, imageTitle, imageDesc) => {
      if (!dialog) return;
      img.src = src;
      title.textContent = imageTitle;
      desc.textContent = imageDesc;
      dialog.showModal();
      if (window.lucide) window.lucide.createIcons();
    },
    closeLightbox: () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    },
    bookFromLightbox: () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
      window.bookingEngine.openModal();
    }
  };
}

/* ==========================================================================
   5. INTERACTIVE MULTI-STEP BOOKING ENGINE
   ========================================================================== */
function initBookingEngine() {
  const dialog = document.getElementById('bookingDialog');
  
  // State
  const bookingState = {
    step: 1,
    service: 'The Vanguard Royal Ritual',
    price: 1490,
    duration: 75,
    barber: 'Kdokoliv z týmu (nejbližší volný)',
    date: 'Zítra (Pátek)',
    time: '10:30',
    drink: 'Single Malt Whisky 12y',
    name: '',
    phone: '',
    email: '',
    bookingCode: ''
  };

  // Populate dynamic next 5 days
  const dateSlotsContainer = document.getElementById('datePickerSlots');
  if (dateSlotsContainer) {
    const daysCzech = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    const monthsCzech = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'];
    dateSlotsContainer.innerHTML = '';

    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);

      // Skip Sunday
      if (nextDate.getDay() === 0) continue;

      const dayName = i === 0 ? 'Dnes' : i === 1 ? 'Zítra' : daysCzech[nextDate.getDay()];
      const dayFormatted = `${nextDate.getDate()}. ${monthsCzech[nextDate.getMonth()]}`;
      const isSelected = i === 1; // Default to tomorrow

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `shrink-0 px-3.5 py-2 rounded-lg border text-xs font-semibold transition ${
        isSelected 
          ? 'bg-[#d4a745] text-black border-[#d4a745] font-bold' 
          : 'bg-[#1a1a26] text-zinc-300 border-white/10 hover:border-white/20'
      }`;
      btn.innerHTML = `<span class="block font-bold">${dayName}</span><span class="text-[10px] opacity-80">${dayFormatted}</span>`;
      
      btn.addEventListener('click', () => {
        document.querySelectorAll('#datePickerSlots button').forEach(b => {
          b.className = 'shrink-0 px-3.5 py-2 rounded-lg border text-xs font-semibold transition bg-[#1a1a26] text-zinc-300 border-white/10 hover:border-white/20';
        });
        btn.className = 'shrink-0 px-3.5 py-2 rounded-lg border text-xs font-semibold transition bg-[#d4a745] text-black border-[#d4a745] font-bold';
        bookingState.date = `${dayName} (${dayFormatted})`;
        updateSummary();
      });

      dateSlotsContainer.appendChild(btn);
    }
  }

  // Service Card click handler
  const serviceCards = document.querySelectorAll('.service-card-select');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingState.service = card.dataset.service;
      bookingState.price = parseInt(card.dataset.price, 10);
      bookingState.duration = parseInt(card.dataset.duration, 10);
      updateSummary();
    });
  });

  // Barber Card click handler
  const barberCards = document.querySelectorAll('.barber-card-select');
  barberCards.forEach(card => {
    card.addEventListener('click', () => {
      barberCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingState.barber = card.dataset.barber;
      updateSummary();
    });
  });

  // Time Slot click handler
  const timeBtns = document.querySelectorAll('.time-slot-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.time = btn.dataset.time;
      updateSummary();
    });
  });

  // Drink click handler
  const drinkCards = document.querySelectorAll('.drink-card-select');
  drinkCards.forEach(card => {
    card.addEventListener('click', () => {
      drinkCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingState.drink = card.dataset.drink;
      updateSummary();
    });
  });

  function updateSummary() {
    const sService = document.getElementById('summaryService');
    const sPrice = document.getElementById('summaryPrice');
    const sBarber = document.getElementById('summaryBarber');
    const sDuration = document.getElementById('summaryDuration');
    const sDateTime = document.getElementById('summaryDateTime');
    const sDrink = document.getElementById('summaryDrink');

    if (sService) sService.textContent = bookingState.service;
    if (sPrice) sPrice.textContent = `${bookingState.price.toLocaleString('cs-CZ')} Kč`;
    if (sBarber) sBarber.textContent = bookingState.barber;
    if (sDuration) sDuration.textContent = `${bookingState.duration} min`;
    if (sDateTime) sDateTime.textContent = `${bookingState.date}, v ${bookingState.time}`;
    if (sDrink) sDrink.textContent = bookingState.drink;
  }

  function goToStep(stepNum) {
    bookingState.step = stepNum;

    // Toggle steps
    const step1 = document.getElementById('bookingStep1');
    const step2 = document.getElementById('bookingStep2');
    const step3 = document.getElementById('bookingStep3');
    const step4 = document.getElementById('bookingStep4');
    const stepSuccess = document.getElementById('bookingStepSuccess');

    [step1, step2, step3, step4, stepSuccess].forEach(s => {
      if (s) s.classList.add('hidden');
    });

    if (stepNum === 1 && step1) step1.classList.remove('hidden');
    if (stepNum === 2 && step2) step2.classList.remove('hidden');
    if (stepNum === 3 && step3) step3.classList.remove('hidden');
    if (stepNum === 4 && step4) {
      step4.classList.remove('hidden');
      updateSummary();
    }
    if (stepNum === 'success' && stepSuccess) stepSuccess.classList.remove('hidden');

    // Update step indicators
    for (let i = 1; i <= 4; i++) {
      const pill = document.getElementById(`stepPill${i}`);
      if (!pill) continue;
      pill.classList.remove('active', 'completed');
      if (typeof stepNum === 'number') {
        if (i === stepNum) {
          pill.classList.add('active');
        } else if (i < stepNum) {
          pill.classList.add('completed');
        }
      } else if (stepNum === 'success') {
        pill.classList.add('completed');
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  window.bookingEngine = {
    openModal: () => {
      if (!dialog) return;
      goToStep(1);
      dialog.showModal();
      if (window.lucide) window.lucide.createIcons();
    },
    openModalWithService: (serviceName, price, duration) => {
      if (!dialog) return;
      bookingState.service = serviceName;
      if (price) bookingState.price = price;
      if (duration) bookingState.duration = duration;

      // Select matching service card
      serviceCards.forEach(c => {
        if (c.dataset.service.toLowerCase().includes(serviceName.toLowerCase())) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });

      goToStep(2); // Jump directly to barber choice
      dialog.showModal();
      if (window.lucide) window.lucide.createIcons();
    },
    openModalWithBarber: (barberName) => {
      if (!dialog) return;
      bookingState.barber = barberName;

      barberCards.forEach(c => {
        if (c.dataset.barber.toLowerCase().includes(barberName.toLowerCase())) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });

      goToStep(3); // Jump directly to date/time choice
      dialog.showModal();
      if (window.lucide) window.lucide.createIcons();
    },
    closeModal: () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    },
    goToStep: goToStep,
    submitBooking: (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const phoneInput = document.getElementById('clientPhone');
      const emailInput = document.getElementById('clientEmail');

      bookingState.name = nameInput ? nameInput.value : '';
      bookingState.phone = phoneInput ? phoneInput.value : '';
      bookingState.email = emailInput ? emailInput.value : '';

      // Generate random booking code
      const randNum = Math.floor(1000 + Math.random() * 9000);
      bookingState.bookingCode = `#VB-2026-${randNum}`;

      // Update success step
      const codeEl = document.getElementById('confirmedBookingCode');
      const summaryEl = document.getElementById('confirmedBookingSummary');
      const gcalBtn = document.getElementById('addToGCalBtn');

      if (codeEl) codeEl.textContent = bookingState.bookingCode;
      if (summaryEl) {
        summaryEl.textContent = `${bookingState.service} • ${bookingState.date} v ${bookingState.time} • Barber: ${bookingState.barber}`;
      }

      // Google Calendar link
      if (gcalBtn) {
        const title = encodeURIComponent(`Střih: Vanguard Barber Club (${bookingState.service})`);
        const details = encodeURIComponent(`Rezervace č. ${bookingState.bookingCode}\nSlužba: ${bookingState.service}\nBarber: ${bookingState.barber}\nDrink: ${bookingState.drink}\nAdresa: Třída Svobody 42, Olomouc`);
        const location = encodeURIComponent('Třída Svobody 42, Olomouc, Czech Republic');
        gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
      }

      goToStep('success');
    }
  };
}

/* ==========================================================================
   6. LIVE GIFT VOUCHER GENERATOR
   ========================================================================== */
function initVoucherGenerator() {
  const optBtns = document.querySelectorAll('.voucher-opt-btn');
  const recipientInput = document.getElementById('voucherRecipientInput');
  const messageInput = document.getElementById('voucherMessageInput');
  const orderBtn = document.getElementById('orderVoucherBtn');

  const previewVal = document.getElementById('previewVoucherValue');
  const previewRec = document.getElementById('previewRecipient');
  const previewMsg = document.getElementById('previewMessage');

  let selectedValue = '1 000 Kč';

  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optBtns.forEach(b => {
        b.className = 'voucher-opt-btn px-3 py-2.5 rounded-lg border border-white/10 bg-[#1a1a26] text-xs font-semibold text-zinc-300 hover:border-white/20';
      });
      btn.className = 'voucher-opt-btn active px-3 py-2.5 rounded-lg border border-[#d4a745] bg-[#d4a745]/15 text-xs font-bold text-[#f6e6b8]';
      selectedValue = btn.dataset.val;
      if (previewVal) previewVal.textContent = selectedValue;
    });
  });

  if (recipientInput && previewRec) {
    recipientInput.addEventListener('input', (e) => {
      previewRec.textContent = e.target.value.trim() || 'Jméno obdarovaného';
    });
  }

  if (messageInput && previewMsg) {
    messageInput.addEventListener('input', (e) => {
      previewMsg.textContent = e.target.value.trim() ? `„${e.target.value.trim()}“` : '';
    });
  }

  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      const recipient = recipientInput ? recipientInput.value.trim() || 'Obdarovaný' : 'Obdarovaný';
      alert(`Dárkový poukaz pro ${recipient} na hodnotu ${selectedValue} byl připraven! V ostré verzi je napojena platební brána (Stripe/Comgate) s okamžitým zasláním dárkového PDF do e-mailu.`);
    });
  }
}

/* ==========================================================================
   7. SALES PITCH DECK FOR BARBERSHOP OWNERS
   ========================================================================== */
function initSalesPitchEngine() {
  const pitchDialog = document.getElementById('pitchDialog');
  const openPitchBtn = document.getElementById('openPitchModalBtn');

  window.salesPitchEngine = {
    openModal: () => {
      if (pitchDialog) {
        pitchDialog.showModal();
        if (window.lucide) window.lucide.createIcons();
      }
    },
    closeModal: () => {
      if (pitchDialog && pitchDialog.open) {
        pitchDialog.close();
      }
    }
  };

  if (openPitchBtn) {
    openPitchBtn.addEventListener('click', () => {
      window.salesPitchEngine.openModal();
    });
  }
}

/* ==========================================================================
   8. SOCIAL PROOF NOTIFICATION TOASTS
   ========================================================================== */
function initSocialProofToasts() {
  const toast = document.getElementById('socialProofToast');
  const nameEl = document.getElementById('toastCustomerName');
  const serviceEl = document.getElementById('toastServiceText');
  const timeEl = document.getElementById('toastTimeText');

  if (!toast || !nameEl || !serviceEl || !timeEl) return;

  const demoEvents = [
    { name: 'Petr K. (Olomouc)', service: 'The Vanguard Royal Ritual', time: 'před 3 minutami • online' },
    { name: 'Jakub M. (Prostějov)', service: 'Razor Skin Fade & Styling', time: 'před 7 minutami • online' },
    { name: 'Tomáš V. (Olomouc)', service: 'Dárkový poukaz na 2 500 Kč', time: 'před 12 minutami • e-shop' },
    { name: 'David & Matyáš S.', service: 'Father & Son Ritual', time: 'před 18 minutami • online' },
    { name: 'Ing. Marek K.', service: 'Beard Sculpt & Hot Towel Shave', time: 'před 24 minutami • online' }
  ];

  let currentIndex = 0;

  function showNextToast() {
    const item = demoEvents[currentIndex];
    nameEl.textContent = item.name;
    serviceEl.textContent = `si právě rezervoval ${item.service}`;
    timeEl.textContent = item.time;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);

    currentIndex = (currentIndex + 1) % demoEvents.length;
  }

  // First toast after 4 seconds, then repeat every 18 seconds
  setTimeout(showNextToast, 4000);
  setInterval(showNextToast, 18000);
}

/* ==========================================================================
   9. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   10. MODERN WEB GUIDANCE DIALOG FALLBACKS
   (Checks click coordinates outside dialog content box for full compatibility)
   ========================================================================== */
function initDialogFallbacks() {
  const outside = (e, dialog) => {
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  const dialogs = document.querySelectorAll('dialog');

  dialogs.forEach(dialog => {
    // If browser doesn't natively support closedby="any"
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      dialog.addEventListener('pointerdown', (e) => {
        pressedOutside = outside(e, dialog);
      });
      dialog.addEventListener('pointerup', (e) => {
        if (pressedOutside && outside(e, dialog)) {
          dialog.close();
        }
      });
    }
  });
}
