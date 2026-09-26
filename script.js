// RavenArc — site interactions
(function () {
  // Sticky nav + mobile menu
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.textContent = open ? 'CLOSE' : 'MENU';
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.textContent = 'MENU';
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // Latest: article cards are plain HTML in index.html (so search engines see them);
  // the topic filters are built from each card's data-topic.
  const filtersEl = document.getElementById('filters');
  const cards = [...document.querySelectorAll('#articles .article')];
  const TOPICS = ['All', ...new Set(cards.map(c => c.dataset.topic))];
  let topic = 'All';

  function renderArticles() {
    cards.forEach(c => { c.hidden = topic !== 'All' && c.dataset.topic !== topic; });
    filtersEl.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b.dataset.topic === topic));
  }
  filtersEl.innerHTML = TOPICS.map(t => `<button class="filter" role="tab" data-topic="${t}">${t}</button>`).join('');
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    topic = b.dataset.topic;
    renderArticles();
  });
  renderArticles();

  // Topics we cover
  const CAPS = [
    { name: 'Corporate strategy', icon: '<circle cx="24" cy="24" r="18"/><path d="M31 17l-4 10-10 4 4-10z"/>', question: 'Where should we compete, and where should we deliberately not?', desc: 'How leadership teams make portfolio and positioning choices with clear logic, explicit trade-offs, and conviction they can defend to the board.', work: ['Portfolio strategy', 'Long-range planning', 'Scenario design', 'Board governance'] },
    { name: 'Growth & markets', icon: '<path d="M6 38h36"/><path d="M8 32l10-10 7 6 15-15"/><path d="M32 13h8v8"/>', question: 'Where is the next profitable pool of growth, and how fast can we reach it?', desc: 'Sizing markets from first principles, testing demand with real customers, and building the case for the moves worth making.', work: ['Market entry', 'Pricing', 'Commercial excellence', 'Adjacencies'] },
    { name: 'Marketing analytics', icon: '<path d="M8 40V26M18 40V18M28 40V22M38 40V10"/><path d="M6 40h36"/>', question: 'Which marketing spend is actually driving growth, and where should the next dollar go?', desc: 'Measuring what marketing really contributes, from customer value to channel returns, and turning the answer into budget and pricing decisions leaders can defend.', work: ['Marketing mix modelling', 'Customer lifetime value', 'Pricing and promotion analytics', 'Budget allocation'] },
    { name: 'AI & operating model', icon: '<rect x="19" y="5" width="10" height="10"/><circle cx="10" cy="38" r="5"/><circle cx="24" cy="38" r="5"/><circle cx="38" cy="38" r="5"/><path d="M24 15v18M24 15L10 33M24 15l14 18"/>', question: 'How must the organisation change for AI to create value, not just activity?', desc: 'How decision rights, workflows and talent must change so that technology investment reaches the P&L instead of stalling in pilots.', work: ['AI strategy', 'Operating model design', 'Decision rights', 'Capability building'] },
    { name: 'Transformation', icon: '<path d="M38 20a15 15 0 0 0-27-6"/><path d="M10 6v8h8"/><path d="M10 28a15 15 0 0 0 27 6"/><path d="M38 42v-8h-8"/>', question: 'How do we change the business without losing it along the way?', desc: 'Turning ambition into a sequenced plan with measurable milestones, and governing it so that it lands.', work: ['Performance improvement', 'Cost transformation', 'Programme leadership'] },
    { name: 'Supply chain', icon: '<rect x="4" y="18" width="10" height="10"/><rect x="19" y="18" width="10" height="10"/><rect x="34" y="18" width="10" height="10"/><path d="M14 23h5M29 23h5"/>', question: 'Is our supply chain built for the cost, risk and service levels the strategy now demands?', desc: 'Seeing the network end to end, from sourcing and footprint to inventory and logistics, and making the trade-offs between cost, resilience and service explicit.', work: ['Network and footprint design', 'Sourcing strategy', 'Inventory optimisation', 'Supply chain resilience'] },
    { name: 'M&A & investment', icon: '<circle cx="18" cy="24" r="12"/><circle cx="30" cy="24" r="12"/>', question: 'Is this the right deal at the right price, and can we make it work?', desc: 'What separates deals that create value from those that destroy it, from commercial diligence to integration.', work: ['Commercial due diligence', 'Value creation plans', 'Post-merger integration'] }
  ];
  const capList = document.getElementById('capList');
  const capPanel = document.getElementById('capPanel');
  capList.innerHTML = CAPS.map((c, i) => `
    <button class="cap-btn" role="tab" data-i="${i}">
      <span class="cap-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="cap-name">${c.name}</span>
      <span class="cap-arrow">→</span>
    </button>`).join('');
  function setCap(i) {
    const c = CAPS[i];
    capList.querySelectorAll('.cap-btn').forEach((b, j) => {
      b.classList.toggle('active', j === i);
      b.setAttribute('aria-selected', j === i);
    });
    document.getElementById('capIcon').innerHTML = c.icon;
    document.getElementById('capQuestion').textContent = c.question;
    document.getElementById('capDesc').textContent = c.desc;
    document.getElementById('capWork').innerHTML = c.work.map(w => `<span>${w}</span>`).join('');
    capPanel.classList.remove('fade'); void capPanel.offsetWidth; capPanel.classList.add('fade');
  }
  capList.addEventListener('click', e => {
    const b = e.target.closest('.cap-btn');
    if (b) setCap(+b.dataset.i);
  });
  setCap(0);

  // Scroll reveal
  const targets = document.querySelectorAll('main > section:not(.hero) h2, .prose, .arc-layer, .cap-panel');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
