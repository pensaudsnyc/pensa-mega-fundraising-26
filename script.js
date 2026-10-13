document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelector('[data-event]');
  if (countdown) {
    const target = new Date(countdown.dataset.event).getTime();
    const update = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000); diff %= 86400000;
      const h = Math.floor(diff / 3600000); diff %= 3600000;
      const m = Math.floor(diff / 60000); diff %= 60000;
      const s = Math.floor(diff / 1000);
      const set = (selector, value) => { const el = countdown.querySelector(selector); if (el) el.textContent = String(value).padStart(2, '0'); };
      set('[data-days]', d); set('[data-hours]', h); set('[data-minutes]', m); set('[data-seconds]', s);
      if (Date.now() >= target) countdown.querySelector('.countdown-label').textContent = 'THE OPENING SESSION HAS STARTED';
    };
    update(); setInterval(update, 1000);
  }
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(button.dataset.copy); button.textContent = button.classList.contains('copy-detail') ? 'Copied ✓' : 'Number copied ✓'; }
    catch { window.prompt('Copy this detail:', button.dataset.copy); }
  }));
  const share = document.querySelector('[data-share]');
  if (share) share.addEventListener('click', async () => {
    const data = { title: document.title, text: 'Support PENSA UDS-NYC Mega Fundraising ’26 to help purchase musical equipment.', url: location.href };
    try { if (navigator.share) await navigator.share(data); else if (navigator.clipboard) { await navigator.clipboard.writeText(location.href); share.textContent = 'Link copied ✓'; } else window.prompt('Copy this campaign link:', location.href); }
    catch (e) { if (e.name !== 'AbortError') window.prompt('Copy this campaign link:', location.href); }
  });

  const fmt = n => Number(n).toLocaleString('en-US');
  fetch('assets/campaign.json?t=' + Date.now(), { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(cfg => {
      const goal = Number(cfg.goal) > 0 ? Number(cfg.goal) : 50000;
      const raised = Math.max(0, Number(cfg.raised) || 0);
      const pct = Math.min(100, Math.floor((raised / goal) * 100));
      const card = document.querySelector('[data-goal-card]');
      if (card) {
        card.querySelectorAll('[data-goal-text]').forEach(el => el.textContent = fmt(goal));
        const r = card.querySelector('[data-raised]'); if (r) r.textContent = fmt(raised);
        const p = card.querySelector('[data-percent]'); if (p) p.textContent = pct;
        const bar = card.querySelector('.progress-track'); if (bar) bar.setAttribute('aria-valuenow', pct);
        const fill = card.querySelector('.progress-fill'); if (fill) requestAnimationFrame(() => { fill.style.width = (raised > 0 ? Math.max(pct, 2) : 0) + '%'; });
        const msg = card.querySelector('[data-progress-message]');
        if (msg) msg.textContent = raised >= goal ? 'Goal reached. Thank you!' : raised > 0 ? 'Thank you to everyone who has given' : 'Be among the first to give';
        const note = card.querySelector('[data-goal-note]');
        if (note && cfg.updated) note.textContent = 'Last updated: ' + cfg.updated + '. Only confirmed contributions are counted.';
      }
      if (typeof cfg.pledgeForm === 'string' && /^https:\/\//.test(cfg.pledgeForm)) {
        document.querySelectorAll('[data-pledge-link]').forEach(a => a.href = cfg.pledgeForm);
        document.querySelectorAll('[data-pledge]').forEach(el => el.hidden = false);
      }
    })
    .catch(() => {});

  document.querySelectorAll('[data-whatsapp]').forEach(a => {
    const url = location.origin !== 'null' && location.protocol.startsWith('http') ? location.origin + location.pathname : '';
    const text = 'Join us for PENSA UDS-NYC Mega Fundraising ’26, 14th to 18th October 2026 at PENSA Auditorium. “When Your Giving Meets God’s Needs, He Blesses and Rewards You.”' + (url ? ' ' + url : '');
    a.href = 'https://wa.me/?text=' + encodeURIComponent(text);
  });
});
