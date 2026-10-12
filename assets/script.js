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
});
